import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Camera } from "expo-camera";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { View, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

// UTILS
import { headerCameraFlash } from "../../../../navigation/utils/navigator.options";

// COMPONENTS
import { Link } from "../../../../components/typography/link.component";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";

// STYLED COMPONENTS
import { NoCameraWrapper } from "../../components/profile.styles";

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null),
    [cameraReady, setCameraReady] = useState(false),
    [flash, setFlash] = useState(2),
    cameraRef = useRef();

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

    console.log("inside flash", flash);
    setFlash(flashType);
  }, [flash]);

  const onSnap = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
        const image = await manipulateAsync(photo.uri, [{ resize: { height: 500 } }], { compress: 0.8, format: SaveFormat.JPEG });

        navigation.navigate("DocumentUpload", { photo: image });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <Link onPress={() => Linking.openURL("app-settings:")}>
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
      style={{ flex: 1, padding: 32, alignItems: "center", justifyContent: "flex-end" }}
      type={Camera.Constants.Type.back}
    >
      {cameraReady && (
        <TouchableOpacity onPress={onSnap}>
          <Ionicons name="scan-circle-outline" size={90} color="#FFF" />
        </TouchableOpacity>
      )}
    </Camera>
  );
};
