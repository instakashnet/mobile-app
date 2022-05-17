import { Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Image, Linking, Platform, TouchableOpacity, View } from "react-native";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Link } from "../../../../components/typography/link.component";
import { Text } from "../../../../components/typography/text.component";
import { Alert } from "../../../../components/UI/alert.component";
import { Tooltip } from "../../../../components/UI/tooltip.component";
// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { clearProfileError, uploadDocument } from "../../../../store/actions";
// STYLED COMPONENTS
import {
  ActionButtons,
  Button,
  ButtonsWrapper,
  CameraItemsWrapper,
  CameraLoader,
  CameraSquare,
  CameraWrapper,
  InfoWrapper,
  LoaderWrapper,
  NoCameraWrapper,
} from "../../components/camera.styles";

export const CameraScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null),
    [cameraReady, setIsCameraReady] = useState(false),
    [frontPhoto, setFrontPhoto] = useState(null),
    [preview, setPreview] = useState(null),
    [loading, setLoading] = useState(false),
    [ratio, setRatio] = useState("4:3"),
    [isRatioSet, setIsRatioSet] = useState(false),
    { height, width } = Dimensions.get("window"),
    screenRatio = height / width,
    cameraRef = useRef(),
    dispatch = useDispatch(),
    { isProcessing, profileError } = useSelector((state) => state.profileReducer),
    { documentType } = route.params;

  // EFFECTS
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // HANDLERS
  const prepareRatio = async () => {
      let desiredRatio = "4:3"; // Start with the system default
      // This issue only affects Android
      if (Platform.OS === "android") {
        const ratios = await cameraRef.current.getSupportedRatiosAsync();

        // Calculate the width/height of each of the supported camera ratios
        // These width/height are measured in landscape mode
        // find the ratio that is closest to the screen ratio without going over
        let distances = {},
          realRatios = {},
          minDistance = null;

        for (const ratio of ratios) {
          const parts = ratio.split(":");
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
        setRatio(desiredRatio);
        // Set a flag so we don't do this
        // calculation each time the screen refreshes
        setIsRatioSet(true);
      }
      setIsCameraReady(true);
    },
    onSnap = async () => {
      setLoading(true);

      try {
        if (cameraRef.current) {
          const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
          let height = photo.height,
            width = photo.width,
            originY = width - height / (Dimensions.get("window").height > 750 ? 6 : 3.5),
            image;

          image = await manipulateAsync(photo.uri, [{ crop: { originX: 0, originY, width, height: height / 3 } }], {
            format: SaveFormat.PNG,
            compress: 0.8,
          });

          setPreview(image?.uri);
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
    onConfirm = useCallback(() => {
      if (documentType === "dni") {
        if (!frontPhoto) {
          setFrontPhoto(preview);
        } else dispatch(uploadDocument({ frontPhoto, backPhoto: preview }, documentType));
      } else dispatch(uploadDocument({ frontPhoto: preview }, documentType));

      setPreview(false);
    }, [documentType, preview]),
    onOpenConfig = () => Linking.openSettings();

  // CONDITIONAL RETURNS
  if (hasPermission === false) {
    return (
      <NoCameraWrapper>
        <Text>
          Debes <Text variant="bold">aceptar los permisos</Text> del uso de la camara para poder tomar la foto de tu documento.
        </Text>
        <Spacer variant="top" />
        <Link onPress={onOpenConfig}>
          <Text>
            <Text variant="bold">Ir a configuración</Text>
          </Text>
        </Link>
      </NoCameraWrapper>
    );
  }

  return (
    <Camera ratio={ratio} ref={(camera) => (cameraRef.current = camera)} onCameraReady={setCameraReady} style={{ flex: 1 }} type={Camera.Constants.Type.back}>
      <SafeArea>
      <CameraWrapper>
            <ButtonsWrapper>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" color="#FFF" size={30} />
              </TouchableOpacity>
              <Tooltip icon={<MaterialIcons name="info-outline" color="#FFF" size={30} />}>
                <Text variant="button">Te recordamos que la foto del documento debe ser nítida y la información totalmente legible.</Text>
              </Tooltip>
            </ButtonsWrapper>

            <CameraItemsWrapper>
              <InfoWrapper>
                <Text variant="subtitle" style={{ color: "#FFF" }}>
                  {documentType === "passport" ? "Foto pasaporte" : frontPhoto ? "Foto trasera" : "Foto frontal"}
                </Text>
              </InfoWrapper>
              {preview ? (
                <>
                  <Image source={{ uri: preview }} style={{ width: 350, height: 275, marginVertical: 15 }} resizeMode="contain" />
                  <InfoWrapper>
                    <ActionButtons>
                      <Button onPress={onConfirm}>
                        <MaterialCommunityIcons name="check-circle" color="#0D8284" size={30} />
                        <Spacer variant="left" />
                        <Text variant="bold" style={{ color: "#FFF" }}>
                          Se ve bien
                        </Text>
                      </Button>
                      <Button variant="secondary" onPress={() => setPreview(null)}>
                        <MaterialCommunityIcons name="backspace-reverse" color="#FFF" size={30} />
                        <Spacer variant="left" />
                        <Text variant="bold" style={{ color: "#FFF" }}>
                          Repetir
                        </Text>
                      </Button>
                    </ActionButtons>
                  </InfoWrapper>
                </>
              ) : (
                <CameraSquare />
              )}
            </CameraItemsWrapper>

            {!loading && !isProcessing ? (
              <TouchableOpacity onPress={onSnap}>
                <Entypo name="circle" size={85} color="#FFF" />
              </TouchableOpacity>
            ) : (
              <LoaderWrapper>
                <CameraLoader />
                <Text style={{ color: "#FFF" }}>{loading ? "Cargando..." : "Subiendo..."}</Text>
              </LoaderWrapper>
            )}
          </CameraWrapper>
      </SafeArea>

      <View style={{ backgroundColor: "#000", width: "100%", paddingBottom: 15, paddingTop: 10, alignItems: "center", justifyContent: "center", flex: 0.075 }}>
        <Text variant="bold" style={{ color: "#FFF" }}>
          Ajusta el documento dentro del marco
        </Text>
      </View>

      <Alert type="error" onClose={clearProfileError} visible={!!profileError}>
        {profileError}
      </Alert>
    </Camera>
  );
};
