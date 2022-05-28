import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { Button } from "../../../../components/UI/button.component";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
// STYLED COMPONENTS
import { HeaderProfile, ProfileInfoWrapper, WhiteTitle } from "../../components/profile.styles";

export const DocumentValidationScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <HeaderProfile>
        <WhiteTitle>Documento Validandose</WhiteTitle>
        <Text variant="button" style={{ color: "#FFF" }}>
          El documento que ha subido se encuentra en proceso de validación. Pronto terminaremos.
        </Text>
      </HeaderProfile>
      <ProfileInfoWrapper>
        <MaterialCommunityIcons name="clock-check-outline" size={75} color="#0D8284" />
        <Spacer variant="top" />
        <Text variant="subtitle">¡Estamos validando!</Text>
        <Spacer variant="top" />
        <Text>
          Actualmente las fotos subidas de tu documento se encuentran en proceso de validación. En aproximadamente 5 minutos te llegará un correo electrónico con un mensaje para
          indicarle el resultado de la verificación. Mientras tanto puedes hacer tus cambios por montos no mayores a 5 mil USD.
        </Text>
        <Spacer variant="top" size={3} />
        <Button onPress={() => navigation.navigate("Exchange")}>Hacer un cambio</Button>
      </ProfileInfoWrapper>
    </SafeArea>
  );
};
