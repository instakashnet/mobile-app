import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { Text } from "../../../../components/typography/text.component";
import { Button } from "../../../../components/UI/button.component";
import { Spacer } from "../../../../components/utils/spacer.component";

// STYLED COMPONENTS
import { ProfileSection, Title } from "../../components/profile.styles";

export const DocumentUploadedScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <ProfileSection>
        <MaterialCommunityIcons size={75} name="checkbox-marked-circle-outline" color="#0D8284" />
        <Spacer variant="top" size={3} />
        <Title variant="subtitle" style={{ textAlign: "center" }}>
          ¡Hemos recibido tu documento!
        </Title>
        <Spacer variant="top" />
        <Text style={{ textAlign: "center" }}>
          Estamos verificando tu identidad, el proceso <Text variant="bold">puede demorar entre 5 a 10 minutos</Text>. Recibirás una notificación a tu correo cuando hayamos
          finalizado.
        </Text>
        <Spacer variant="top" size={4} />
        <Button onPress={() => navigation.navigate("MyProfile")}>Aceptar</Button>
      </ProfileSection>
    </SafeArea>
  );
};
