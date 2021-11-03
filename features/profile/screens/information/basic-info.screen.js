import React from "react";
import { View } from "react-native";

// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { HeaderProfile, InfoItem, NavItem, ItemWrapper, RightArrow } from "../../components/profile.styles";

export const BasicInfoScreen = ({ route, navigation }) => {
  return (
    <SafeArea>
      <HeaderProfile>
        <Text variant="button" style={{ color: "#FFF" }}>
          Si deseas modificar tu nombre y/o documento debes escribirnos a nuestro whatsapp o a contacto@instakash.net
        </Text>
      </HeaderProfile>
      <Spacer variant="top" size={6} />
      <InfoItem>
        <Text variant="caption">Nombre y apellido</Text>
        <Text>Roger Rengifo</Text>
      </InfoItem>
      <InfoItem>
        <Text variant="caption">Documento de identidad</Text>
        <Text>DNI 12345678</Text>
      </InfoItem>
      <Spacer variant="top" size={2} />
      <NavItem onPress={() => navigation.navigate("EditInfo")}>
        <ItemWrapper>
          <View>
            <Text variant="caption">Teléfono</Text>
            <Text>+51930463531</Text>
          </View>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <Spacer variant="top" size={2} />
      <NavItem>
        <ItemWrapper>
          <View>
            <Text variant="caption">Correo electrónico</Text>
            <Text>thelea12@gmail.com</Text>
          </View>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
    </SafeArea>
  );
};
