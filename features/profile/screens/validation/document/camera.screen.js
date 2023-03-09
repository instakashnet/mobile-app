import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
// import { manipulateAsync, SaveFormat, FlipType } from 'expo-image-manipulator';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Linking, Platform, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
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
  InfoWrapper,
  LoaderWrapper,
  BottomInfoWrapper,
  NoCameraWrapper,
  TopOverlay,
  SquareWrapper,
  VerticalOverlay,
  Square,
  BottomOverlay,
} from '../../../components/camera.styles';
import { usePrepareRatio } from '../../../../../hooks/use-prepare-ratio.hook';

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null),
    [loading, setLoading] = useState(false),
    cameraRef = useRef(),
    isFocused = useIsFocused(),
    { ratio, setCameraReady } = usePrepareRatio();
  user = useSelector((state) => state.authReducer.user);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // HANDLERS
  const onSnap = async () => {
      setLoading(true);

      try {
        if (cameraRef.current) {
          const photo = await cameraRef.current.takePictureAsync({ quality: 1, skipProcessing: true });

          navigation.navigate('PhotoPreview', { photo, documentType: user?.documentType.toLowerCase() });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
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
      <Camera ratio={ratio} ref={(camera) => (cameraRef.current = camera)} onCameraReady={setCameraReady} style={StyleSheet.absoluteFill} type={Camera.Constants.Type.back}>
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
          <Text style={{ color: '#FFF', marginBottom: 20, textAlign: 'center' }} variant='bold'>
            Toma una foto de tu {user?.documentType}
          </Text>
        </TopOverlay>
        <SquareWrapper>
          <VerticalOverlay />
          <Square />
          <VerticalOverlay />
        </SquareWrapper>
        <BottomOverlay>
          <SafeArea>
            <InfoWrapper>
              {!loading ? (
                <TouchableOpacity activeOpacity={0.5} onPress={onSnap}>
                  <MaterialCommunityIcons name='circle-slice-8' size={75} color='#FFF' />
                </TouchableOpacity>
              ) : (
                <LoaderWrapper>
                  <CameraLoader />
                  <Text style={{ color: '#FFF' }}>Cargando...</Text>
                </LoaderWrapper>
              )}
            </InfoWrapper>
          </SafeArea>

          <BottomInfoWrapper>
            <Text variant='bold' style={{ color: '#FFF' }}>
              Ajusta el documento dentro del marco
            </Text>
          </BottomInfoWrapper>
        </BottomOverlay>
      </Camera>
    )
  );
};
