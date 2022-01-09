import React, { useState } from "react";
import { View } from "react-native";

// ASSETS
import { DniIcon } from "../../../../assets/icons/document/dni";
import { PassportIcon } from "../../../../assets/icons/document/passport";

// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { ButtonSelect } from "../../../../components/forms/button-select.component";
import { Button } from "../../../../components/UI/button.component";

// STYLED COMPONENTS
import { HeaderProfile, ProfileScroll, ProfileInfoWrapper } from "../../components/profile.styles";

export const DocumentTypeScreen = ({ navigation, route }) => {
  const [documentType, setDocumentType] = useState(null),
    user = route.params?.user;

  return (
    <SafeArea>
      <ProfileScroll>
        <HeaderProfile>
          <Text variant="title" style={{ color: "#FFF" }}>
            Tipo de documento
          </Text>
          <Spacer variant="top" />
          <Text variant="button" style={{ color: "#FFF" }}>
            Debes tomar fotos al documento que selecciones. Solo están permitidos documentos de la lista, no debe subir un documento no listado.
          </Text>
        </HeaderProfile>
        <ProfileInfoWrapper>
          <Text variant="title">Selecciona tu documento</Text>
          <Spacer variant="top" />
          {user?.documentType === "pasaporte" ? (
            <ButtonSelect selected={documentType === "passport"} onPress={() => setDocumentType("passport")}>
              <PassportIcon />
              <Spacer variant="left" />
              <Text variant="bold" numberOfLines={1}>
                Pasaporte
              </Text>
            </ButtonSelect>
          ) : (
            <ButtonSelect selected={documentType === "dni"} onPress={() => setDocumentType("dni")}>
              <DniIcon />
              <Spacer variant="left" />
              <View>
                <Text variant="bold" numberOfLines={1}>
                  Documento emitido por el país
                </Text>
                <Text variant="caption">DNI, PTP, CE</Text>
              </View>
            </ButtonSelect>
          )}
          <View style={{ width: "100%", paddingLeft: 5 }}>
            {[
              {
                key: "El proceso de validación puede demorar hasta 5 minutos. ",
              },
              {
                key: "Recibirás una notifiacion a tu correo cuando termine el proceso de validación.",
              },
              {
                key: "Este proceso se realiza una única vez y luego podrás hacer tus cambios sin limite.",
              },
            ].map((item) => (
              <Text key={item.key} style={{ marginTop: 15 }}>{`\u2022 ${item.key}`}</Text>
            ))}
          </View>

          <Spacer variant="top" size={3} />
          <Button disabled={!documentType} onPress={() => navigation.navigate("DocumentInfo", { documentType })}>
            Continuar
          </Button>
        </ProfileInfoWrapper>
      </ProfileScroll>
    </SafeArea>
  );
};
