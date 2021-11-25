import React, { useEffect, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useFocusEffect } from "@react-navigation/native";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { uploadDocument, clearProfileError } from "../../../../store/actions";

// ASSETS
import { DocumentFront } from "../../../../assets/illustrations/document-front";

// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { Button } from "../../../../components/UI/button.component";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { UploadForm } from "../../components/upload-form.component";
import { Alert } from "../../../../components/UI/alert.component";

// STYLED COMPONENTS
import { CoverBackground, ProfileWrapper, ProfileScroll, Title, Info, ListItem, ListWrapper } from "../../components/profile.styles";

export const DocumentUploadScreen = ({ route, navigation }) => {
  const dispatch = useDispatch(),
    { isProcessing, profileError } = useSelector((state) => state.profileReducer),
    { photo, uploadType, user } = route.params,
    [image, setImage] = useState(null);

  // EFFECTS
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Debes aceptar los permisos a fotos para poder cargar el documento desde tu galeria.");
      }
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (photo) {
        setImage(photo);
      }
    }, [photo])
  );

  // HANDLERS
  const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.cancelled) {
        const image = await manipulateAsync(result.uri, [{ resize: { height: 500 } }], { compress: 0.8, format: SaveFormat.JPEG });
        setImage(image);
      }
    },
    onUploadDocument = (values) => dispatch(uploadDocument(values, uploadType));

  return (
    <SafeArea>
      <ProfileScroll>
        <CoverBackground>
          {image ? (
            <UploadForm image={image} type={uploadType} user={user} onSubmit={onUploadDocument} isProcessing={isProcessing} />
          ) : (
            <>
              <Title>Parte {uploadType}</Title>
              <DocumentFront width={140} />
              <Info>Sube la parte {uploadType} de tu documento. la imagen debe cumplir con los requisitos listados debajo.</Info>
            </>
          )}
        </CoverBackground>
        <ProfileWrapper>
          <Text variant="subtitle">A tomar en cuenta:</Text>
          <ListWrapper>
            <ListItem>
              <Ionicons name="checkmark-sharp" size={25} color="#13AAAC" />
              <Text>El documento debe ser perfectamente legible.</Text>
            </ListItem>
            <ListItem>
              <Ionicons name="checkmark-sharp" size={25} color="#13AAAC" />
              <Text>La imagen no debe pesar más de 5MB.</Text>
            </ListItem>
            <ListItem>
              <Ionicons name="checkmark-sharp" size={25} color="#13AAAC" />
              <Text>Solo se permiten formatos PNG, JPG y JPEG.</Text>
            </ListItem>
          </ListWrapper>
          <Spacer variant="top" />
          <Button icon="camera" labelStyle={{ fontSize: 20, color: "#13AAAC" }} onPress={() => navigation.navigate("Camera")}>
            <Text variant="button" style={{ fontSize: 12 }}>
              Abrir cámara
            </Text>
          </Button>
          <Button variant="secondary" icon="image" onPress={pickImage} labelStyle={{ fontSize: 20, color: "#13AAAC" }}>
            <Text variant="button" style={{ fontSize: 12 }}>
              Seleccionar desde galeria
            </Text>
          </Button>
        </ProfileWrapper>
      </ProfileScroll>
      <Alert type="error" onClose={clearProfileError} visible={!!profileError}>
        {profileError}
      </Alert>
    </SafeArea>
  );
};
