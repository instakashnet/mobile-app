import React from "react";

// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { HeaderProfile, NavItem, ItemWrapper, RightArrow } from "../../components/profile.styles";

export const DocumentInfoScreen = ({ route, navigation }) => {
  const { profile } = route.params;

  return (
    <SafeArea>
      <HeaderProfile>
        <Text variant="button" style={{ color: "#FFF" }}>
          Debes cargar la parte frontal y trasera de tu documento para completar esta sección. Si tienes alguna duda puedes escribirnos a nuestro whatsapp o a
          contacto@instakash.net
        </Text>
      </HeaderProfile>
      <Spacer variant="top" size={6} />
      <NavItem onPress={() => navigation.navigate("UploadDocument", { profile, uploadType: "front" })}>
        <ItemWrapper>
          <Text>Subir parte frontal</Text>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <NavItem onPress={() => navigation.navigate("UploadDocument", { profile, uploadType: "back" })}>
        <ItemWrapper>
          <Text>Subir parte trasera</Text>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
    </SafeArea>
  );
};
