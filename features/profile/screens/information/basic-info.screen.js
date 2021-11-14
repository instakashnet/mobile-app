import React from "react";
import { View } from "react-native";

// REDUX
import { useSelector } from "react-redux";

// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { HeaderProfile, InfoItem, NavItem, ItemWrapper, RightArrow } from "../../components/profile.styles";

export const BasicInfoScreen = ({ route, navigation }) => {
  const user = useSelector((state) => state.authReducer.user);

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
        <Text>{user.name}</Text>
      </InfoItem>
      <InfoItem>
        <Text variant="caption">Documento de identidad</Text>
        <Text>{`${user.documentType} ${user.documentIdentification}`}</Text>
      </InfoItem>
      <Spacer variant="top" size={2} />
      <NavItem onPress={() => navigation.navigate("EditInfo", { user, editType: "phone" })}>
        <ItemWrapper>
          <View>
            <Text variant="caption">Teléfono</Text>
            <Text>{user.phone}</Text>
          </View>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <Spacer variant="top" size={2} />
      <NavItem onPress={() => navigation.navigate("EditInfo", { user, editType: "email" })}>
        <ItemWrapper>
          <View>
            <Text variant="caption">Correo electrónico</Text>
            <Text>{user.email}</Text>
          </View>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
    </SafeArea>
  );
};
