import React, { useState, useEffect, useRef, useCallback } from "react";
import { Camera } from "expo-camera";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { View, Linking, Image, Dimensions, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { uploadDocument } from "../../../../store/actions";

// COMPONENTS
import { Link } from "../../../../components/typography/link.component";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { Button } from "../../../../components/UI/button.component";

// STYLED COMPONENTS
import { NoCameraWrapper, CameraWrapper, CameraOverlay, CameraSquare, CameraButton, CameraLoader, ButtonsWrapper, Info, Title } from "../../components/camera.styles";

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
    isProcessing = useSelector((state) => state.profileReducer.isProcessing),
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
          let image;

          image = await manipulateAsync(photo.uri, [{ resize: { width: photo.width * 0.8 } }], {
            format: SaveFormat.JPEG,
          });

          setPreview(image.uri);
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
        } else {
          dispatch(uploadDocument({ frontPhoto, backPhoto: preview }, documentType));
        }
      } else {
        dispatch(uploadDocument({ frontPhoto: preview }, documentType));
      }

      setPreview(false);
    }, [documentType, preview]),
    onOpenConfig = () => Linking.openSettings();

  // CONDITIONAL RETURNS
  if (hasPermission === null) {
    return <View />;
  }
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
      {cameraReady && (
        <CameraWrapper>
          <CameraOverlay />
          <Title variant="bold">{documentType === "passport" ? "Foto pasaporte" : frontPhoto ? "Foto trasera" : "Foto frontal"}</Title>
          {preview ? <Image source={{ uri: preview }} style={{ width: Dimensions.get("window").width / 1.06, flex: 0.34 }} resizeMode="cover" /> : <CameraSquare />}
          <CameraOverlay />
          {!isProcessing && <Info variant="bold">Ajusta el documento dentro del cuadro</Info>}
          {preview ? (
            <ButtonsWrapper>
              <Button onPress={onConfirm}>Se ve bien</Button>
              <Button variant="secondary" onPress={() => setPreview(null)}>
                Volver a tomar
              </Button>
            </ButtonsWrapper>
          ) : (
            !loading &&
            !isProcessing && (
              <CameraButton onPress={onSnap}>
                <MaterialCommunityIcons name="circle-slice-8" size={90} color="#FFF" />
              </CameraButton>
            )
          )}
          {loading && <CameraLoader />}
          {isProcessing && (
            <>
              <Info variant="bold" style={{ left: Dimensions.get("window").width / 2.5, bottom: "22%" }}>
                Subiendo
              </Info>
              <CameraLoader />
            </>
          )}
        </CameraWrapper>
      )}
    </Camera>
  );
};
