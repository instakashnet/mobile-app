import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
// import { manipulateAsync, SaveFormat, FlipType } from 'expo-image-manipulator';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Linking, Platform, TouchableOpacity, View } from 'react-native';
// REDUX
import { useSelector } from 'react-redux';
import { Link } from '../../../../../components/typography/link.component';
import { Text } from '../../../../../components/typography/text.component';
import { Tooltip } from '../../../../../components/UI/tooltip.component';
// COMPONENTS
import { SafeArea } from '../../../../../components/utils/safe-area.component';
import { Spacer } from '../../../../../components/utils/spacer.component';
// STYLED COMPONENTS
import {
  HeaderWrapper,
  CameraLoader,
  CameraSquare,
  VerticalOverlay,
  CameraWrapper,
  InfoWrapper,
  LoaderWrapper,
  NoCameraWrapper,
  TopOverlay,
  BottomOverlay,
} from '../../../components/camera.styles';

export const CameraScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null),
    [imagePadding, setImagePadding] = useState(0),
    [loading, setLoading] = useState(false),
    [ratio, setRatio] = useState('4:3'),
    [isRatioSet, setIsRatioSet] = useState(false),
    { height, width } = Dimensions.get('window'),
    screenRatio = height / width,
    cameraRef = useRef(),
    isFocused = useIsFocused(),
    user = useSelector((state) => state.authReducer.user),
    { photoSide } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // HANDLERS
  const prepareRatio = async () => {
      let desiredRatio = '4:3'; // Start with the system default
      // This issue only affects Android
      if (Platform.OS === 'android') {
        const ratios = await cameraRef.current.getSupportedRatiosAsync();

        // Calculate the width/height of each of the supported camera ratios
        // These width/height are measured in landscape mode
        // find the ratio that is closest to the screen ratio without going over
        let distances = {};
        let realRatios = {};
        let minDistance = null;
        for (const ratio of ratios) {
          const parts = ratio.split(':');
          const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
          realRatios[ratio] = realRatio;
          // ratio can't be taller than screen, so we don't want an abs()
          const distance = screenRatio - realRatio;
          distances[ratio] = realRatio;
          if (minDistance == null) {
            minDistance = ratio;
          } else {
            if (distance >= 0 && distance < distances[minDistance]) {
              minDistance = ratio;
            }
          }
        }
        // set the best match
        desiredRatio = minDistance;
        //  calculate the difference between the camera width and the screen height
        const remainder = Math.floor((height - realRatios[desiredRatio] * width) / 2);
        // set the preview padding and preview ratio
        setImagePadding(remainder);
        setRatio(desiredRatio);
        // Set a flag so we don't do this
        // calculation each time the screen refreshes
        setIsRatioSet(true);
      }
    },
    onSnap = async () => {
      setLoading(true);

      try {
        if (cameraRef.current) {
          const photo = await cameraRef.current.takePictureAsync({ quality: 1, skipProcessing: true });

          navigation.navigate('PhotoPreview', { photo, documentType: user?.documentType.toLowerCase(), photoSide });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    setCameraReady = async () => {
      if (!isRatioSet) await prepareRatio();
    },
    onOpenConfig = () => Linking.openSettings();

  // CONDITIONAL RETURNS
  if (hasPermission === null) {
    return (
      <NoCameraWrapper>
        <Text>Solicitando los permisos de la camara.</Text>
      </NoCameraWrapper>
    );
  }

  if (hasPermission === false) {
    return (
      <NoCameraWrapper>
        <Text>
          Debes <Text variant='bold'>aceptar los permisos</Text> del uso de la camara para poder tomar la foto de tu documento.
        </Text>
        <Spacer variant='top' />
        <Link onPress={onOpenConfig}>
          <Text>
            <Text variant='bold'>Ir a configuración</Text>
          </Text>
        </Link>
      </NoCameraWrapper>
    );
  }

  return (
    isFocused && (
      <Camera
        ratio={ratio}
        ref={(camera) => (cameraRef.current = camera)}
        onCameraReady={setCameraReady}
        style={{ flex: 1, width: '100%', height: '100%' }}
        type={Camera.Constants.Type.back}
      >
        <TopOverlay>
          <SafeArea>
            <HeaderWrapper>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name='arrow-back' color='#FFF' size={30} />
              </TouchableOpacity>
              <Tooltip icon={<MaterialIcons name='info-outline' color='#FFF' size={30} />}>
                <Text variant='button'>Te recordamos que la foto del documento debe ser nítida y la información totalmente legible.</Text>
              </Tooltip>
            </HeaderWrapper>
          </SafeArea>
        </TopOverlay>

        <CameraWrapper>
          <VerticalOverlay />
          <CameraSquare />
          <VerticalOverlay />
        </CameraWrapper>

        <BottomOverlay style={{ flex: 0.25 }}>
          <SafeArea>
            <InfoWrapper>
              {!loading ? (
                <>
                  <Text style={{ color: '#FFF', marginTop: 15 }}>{user?.documentType === 'pasaporte' ? 'Foto pasaporte' : `Foto ${photoSide}`}</Text>
                  <TouchableOpacity activeOpacity={0.5} onPress={onSnap}>
                    <MaterialCommunityIcons name='circle-slice-8' size={75} color='#FFF' />
                  </TouchableOpacity>
                </>
              ) : (
                <LoaderWrapper>
                  <CameraLoader />
                  <Text style={{ color: '#FFF' }}>Cargando...</Text>
                </LoaderWrapper>
              )}
            </InfoWrapper>

            <View style={{ width: Dimensions.get('window').width, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', marginTop: 'auto', padding: 15 }}>
              <Text variant='bold' style={{ color: '#FFF' }}>
                Ajusta el documento dentro del marco
              </Text>
            </View>
          </SafeArea>
        </BottomOverlay>
      </Camera>
    )
  );
};
