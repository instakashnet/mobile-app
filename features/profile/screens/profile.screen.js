import React from "react";

// HELPERS
import { openURL } from "../../../shared/helpers/functions";

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
  const user = useSelector((state) => state.authReducer.user);

  return (
    <SafeArea>
      <InfoWrapper>
        <Male width={90} />
        <Spacer variant="top" />
        <Text variant="subtitle" style={{ color: "#FFF" }}>
          {user.name}
        </Text>
        <Text style={{ color: "#FFF" }}>{user.username}</Text>
      </InfoWrapper>
      <Spacer variant="top" size={6} />
      <NavItem onPress={() => navigation.navigate("BasicInfo", { user })}>
        <ItemWrapper>
          <Text>Datos personales</Text>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <NavItem onPress={() => navigation.navigate("DocumentInfo", { user })}>
        <ItemWrapper>
          <Text>Documento</Text>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <NavItem onPress={() => navigation.navigate("AdditionalInfo", { user })}>
        <ItemWrapper>
          <Text>Datos adicionales</Text>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <NavItem onPress={() => openURL("https://instakash.net/faq/")}>
        <ItemWrapper>
          <Text>Centro de ayuda</Text>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
    </SafeArea>
  );
};
