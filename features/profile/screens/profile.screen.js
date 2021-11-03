import React from "react";

// ASSETS
import { Male } from "../../../assets/icons/male";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { InfoWrapper, NavItem, RightArrow, ItemWrapper } from "../components/profile.styles";
import { Text } from "../../../components/typography/text.component";

export const ProfileScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <InfoWrapper>
        <Male width={90} />
        <Spacer variant="top" />
        <Text variant="subtitle" style={{ color: "#FFF" }}>
          Roger Rengifo
        </Text>
        <Text style={{ color: "#FFF" }}>Perfil natural</Text>
      </InfoWrapper>
      <Spacer variant="top" size={6} />
      <NavItem onPress={() => navigation.navigate("BasicInfo")}>
        <ItemWrapper>
          <Text>Datos personales</Text>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <NavItem>
        <ItemWrapper>
          <Text>Documento</Text>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <NavItem>
        <ItemWrapper>
          <Text>Datos adicionales</Text>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <NavItem>
        <ItemWrapper>
          <Text>Centro de ayuda</Text>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
    </SafeArea>
  );
};
