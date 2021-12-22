import React, { useState, useEffect, useRef, useCallback } from "react";
import { Camera } from "expo-camera";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { View, Linking, Image, Dimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { uploadDocument } from "../../../../store/actions";

// UTILS
import { headerCameraFlash } from "../../../../navigation/utils/navigator.options";

// COMPONENTS
import { Link } from "../../../../components/typography/link.component";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { Button } from "../../../../components/UI/button.component";

// STYLED COMPONENTS
import { NoCameraWrapper, CameraOverlay, CameraSquare } from "../../components/camera.styles";

export const CameraScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null),
    [cameraReady, setCameraReady] = useState(false),
    [flash, setFlash] = useState(2),
    [frontPhoto, setFrontPhoto] = useState(null),
    [preview, setPreview] = useState(false),
    [loading, setLoading] = useState(false),
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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (hasPermission ? headerCameraFlash(onFlashType, flash) : null),
    });
  }, [onFlashType, hasPermission, flash]);

  // HANDLERS
  const onFlashType = useCallback(() => {
      let flashType;

      if (flash === Camera.Constants.FlashMode.auto) flashType = Camera.Constants.FlashMode.on;
      if (flash === Camera.Constants.FlashMode.on) flashType = Camera.Constants.FlashMode.off;
      if (flash === Camera.Constants.FlashMode.off) flashType = Camera.Constants.FlashMode.auto;

      setFlash(flashType);
    }, [flash]),
    onSnap = async () => {
      setLoading(true);

      try {
        if (cameraRef.current) {
          const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
          let image;

          if (photo.width < 3000) {
            image = await manipulateAsync(photo.uri, [{ resize: { height: Dimensions.get("window").height / 2 } }, { rotate: 90 }], {
              format: SaveFormat.JPEG,
              compress: 0.8,
            });
          } else {
            image = await manipulateAsync(photo.uri, [{ resize: { height: Dimensions.get("window").height / 2 } }], {
              format: SaveFormat.JPEG,
              compress: 0.8,
            });
          }

          setPreview(image.uri);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    onConfirm = useCallback(() => {
      setPreview(false);

      if (documentType === "dni") {
        if (!frontPhoto) {
          setFrontPhoto(preview);
        } else {
          dispatch(uploadDocument({ frontPhoto, backPhoto: preview }, documentType));
        }
      } else {
        dispatch(uploadDocument({ frontPhoto: preview }, documentType));
      }
    }, [frontPhoto, documentType, preview]),
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
    <Camera
      ratio="16:9"
      flashMode={flash}
      ref={(camera) => (cameraRef.current = camera)}
      onCameraReady={() => setCameraReady(true)}
      style={{ flex: 1, padding: 32, alignItems: "center", justifyContent: "center" }}
      type={Camera.Constants.Type.back}
    >
      {cameraReady &&
        (preview ? (
          <>
            <CameraOverlay preview={preview} />
            <Text variant="title" variant="bold" style={{ color: "#FFF" }}>
              {documentType !== "passport" ? (frontPhoto ? "Foto trasera" : "Foto frontal") : "Foto pasaporte"}
            </Text>
            <Image source={{ uri: preview }} style={{ width: "100%", height: Dimensions.get("window").height / 4 }} resizeMode="contain" />
            <Spacer variant="top" size={2} />
            <Text variant="bold" style={{ color: "#FFF" }}>
              ¿Se leen bien los datos?
            </Text>
            <Spacer variant="top" size={2} />
            <Button onPress={onConfirm}>Si, se lee bien</Button>
            <Button variant="secondary" onPress={() => setPreview(false)}>
              Volver a tomar
            </Button>
          </>
        ) : (
          <>
            <CameraOverlay preview={preview} />
            <Text variant="title" style={{ color: "#FFF" }}>
              {documentType !== "passport" ? (frontPhoto ? "Foto trasera" : "Foto frontal") : "Foto pasaporte"}
            </Text>
            <CameraSquare />
            <Text variant="bold" style={{ color: "#FFF" }}>
              {isProcessing ? "Subiendo..." : "Coloca tu documento dentro del marco"}
            </Text>
            <Spacer variant="top" size={2} />
            {loading || isProcessing ? (
              <ActivityIndicator color="#FFF" animating size={90} />
            ) : (
              <TouchableOpacity onPress={onSnap}>
                <Ionicons name="scan-circle-outline" size={90} color="#FFF" />
              </TouchableOpacity>
            )}
          </>
        ))}
    </Camera>
  );
};
