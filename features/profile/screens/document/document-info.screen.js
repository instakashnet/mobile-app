import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";

// ASSETS
import { DocumentCorrect } from "../../../../assets/illustrations/document/document-correct";
import { DocumentIncorrect } from "../../../../assets/illustrations/document/document-incorrect";

// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { Button } from "../../../../components/UI/button.component";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
// STYLED COMPONENTS
import { CoverBackground, ProfileInfoWrapper, WhiteTitle, ListItem, DocumentsWrapper } from "../../components/profile.styles";

export const DocumentInfoScreen = ({ route, navigation }) => {
  const { documentType } = route.params;

  return (
    <SafeArea>
      <CoverBackground>
        <DocumentsWrapper>
          <DocumentCorrect />
          <DocumentIncorrect />
        </DocumentsWrapper>
        <WhiteTitle>Toma una foto a tu documento</WhiteTitle>
        <Text style={{ color: "#FFF", textAlign: "center" }}>Sigue las siguientes indicaciones para que puedas evitar rechazos en la validación.</Text>
      </CoverBackground>
      <ProfileInfoWrapper>
        <Text variant="subtitle" style={{ alignSelf: "flex-start" }}>
          ¡Importante!
        </Text>
        <FlatList
          data={[
            {
              key: "El nûmero del documento debe ser el mismo usado en tu registro.",
            },
            {
              key: "La fotografía no debe estar borrosa, desenfocada o pixelada.",
            },
            {
              key: "Tu información y dirección en el documento deben ser completamente legibles.",
            },
            {
              key: "La foto no debe pesar más de 10Mb. Verifica que el formato de la cámara sea .jpg o .png.",
            },
          ]}
          style={{ width: "100%" }}
          contentContainerStyle={{ alignItems: "flex-start" }}
          renderItem={({ item }) => {
            return (
              <ListItem>
                <Ionicons name="checkmark-sharp" size={20} color="#13AAAC" style={{ marginRight: 5 }} />
                <Text style={{ marginTop: 15 }}>{item.key}</Text>
              </ListItem>
            );
          }}
        />
        <Spacer variant="top" />
        <Button icon="camera" labelStyle={{ fontSize: 20, color: "#13AAAC" }} onPress={() => navigation.navigate("Camera", { documentType })}>
          <Text variant="button" style={{ fontSize: 14 }}>
            Tomar foto
          </Text>
        </Button>
        <Spacer variant="bottom" />
      </ProfileInfoWrapper>
    </SafeArea>
  );
};
