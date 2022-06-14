import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View } from "react-native";
// ASSETS
import { DocumentCorrect } from "../../../../assets/illustrations/document/document-correct";
import { DocumentIncorrect } from "../../../../assets/illustrations/document/document-incorrect";
import { Text } from "../../../../components/typography/text.component";
import { Button } from "../../../../components/UI/button.component";
// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { Spacer } from "../../../../components/utils/spacer.component";
// STYLED COMPONENTS
import { CoverBackground, DocumentsWrapper, ListItem, ProfileInfoWrapper, ProfileScroll, WhiteTitle } from "../../components/profile.styles";

export const DocumentInfoScreen = ({ route, navigation }) => {
  const { documentType } = route.params,
    [hasPermission, setHasPermission] = useState(null);

  // EFFECTS
  // useEffect(() => {
  //   (async () => {
  //     const { status } = await requestCameraPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  return (
    <SafeArea>
      <ProfileScroll>
        <CoverBackground>
          <DocumentsWrapper>
            <DocumentCorrect />
            <DocumentIncorrect />
          </DocumentsWrapper>
          <WhiteTitle>Toma una foto</WhiteTitle>
          <Text style={{ color: "#FFF", textAlign: "center" }}>
            Sube una foto de tu focumento y sigue las siguientes indicaciones para que puedas evitar rechazos en la validación.
          </Text>
        </CoverBackground>
        <ProfileInfoWrapper>
          <Text variant="subtitle" style={{ alignSelf: "flex-start" }}>
            ¡Importante!
          </Text>
          <View style={{ width: "100%", paddingRight: 25 }}>
            {[
              {
                key: "El tipo y nro. de documento debe ser el mismo usado en tu registro.",
              },
              {
                key: "La fotografía no debe estar borrosa, desenfocada o pixelada.",
              },
              {
                key: "Toda información en el documento debe ser totalmente legible.",
              },
              {
                key: "La foto no debe pesar más de 10Mb.",
              },
            ].map((item) => (
              <ListItem key={item.key}>
                <Ionicons name="checkmark-sharp" size={20} color="#13AAAC" style={{ marginRight: 5 }} />
                <Text style={{ marginTop: 15 }}>{item.key}</Text>
              </ListItem>
            ))}
          </View>
          <Spacer variant="top" />
          <Button icon="camera" labelStyle={{ fontSize: 20, color: "#13AAAC" }} onPress={() => navigation.navigate("Camera", { documentType, hasPermission })}>
            <Text variant="button" style={{ fontSize: 14 }}>
              Tomar foto
            </Text>
          </Button>
          <Spacer variant="top" size={6} />
        </ProfileInfoWrapper>
      </ProfileScroll>
    </SafeArea>
  );
};
