import React from "react";

// REDUX
import { useSelector } from "react-redux";

// ASSETS
import { Male } from "../../../assets/icons/male";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { InfoWrapper, NavItem, RightArrow, ItemWrapper } from "../components/profile.styles";
import { Text } from "../../../components/typography/text.component";

export const ProfileScreen = ({ navigation }) => {
  const profile = useSelector((state) => state.profileReducer.profile);

  return (
    <SafeArea>
      <InfoWrapper>
        <Male width={90} />
        <Spacer variant="top" />
        <Text variant="subtitle" style={{ color: "#FFF" }}>
          {profile.razonSocial || `${profile.firstName} ${profile.lastName}`}
        </Text>
        <Text style={{ color: "#FFF" }}>Perfil {profile.razonSocial ? "jurídico" : "natural"}</Text>
      </InfoWrapper>
      <Spacer variant="top" size={6} />
      <NavItem onPress={() => navigation.navigate("BasicInfo", { profile })}>
        <ItemWrapper>
          <Text>Datos personales</Text>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <NavItem onPress={() => navigation.navigate("DocumentInfo", { profile })}>
        <ItemWrapper>
          <Text>Documento</Text>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <NavItem onPress={() => navigation.navigate("AdditionalInfo", { profile })}>
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
