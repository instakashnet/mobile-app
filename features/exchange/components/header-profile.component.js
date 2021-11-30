import React, { useState, useEffect } from "react";
import { View } from "react-native";

// ASSETS
import { Male } from "../../../assets/icons/male";
import { CompanyIcon } from "../../../assets/icons/company";
import { Female } from "../../../assets/icons/female";

// COMPONENTS
import { Link } from "../../../components/typography/link.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";

// STYLED COMPONENTS
import { ExchangeHeader, ProfileInfo, Type } from "./exchange.styles";

export const HeaderProfile = ({ profile, onProfileChange }) => {
  const [profileName, setProfileName] = useState("");

  // EFFECTS
  useEffect(() => {
    if (profile.razonSocial) {
      setProfileName(profile.razonSocial.length <= 25 ? profile.razonSocial : profile.razonSocial.substring(0, 25));
    } else {
      let name = `${profile.firstName.split(" ")[0]} ${profile.lastName.split(" ")[0]}`;
      setProfileName(name);
    }
  }, [profile]);

  return (
    <ExchangeHeader>
      <ProfileInfo>
        {profile.type === "juridica" ? <CompanyIcon width={25} /> : profile.identitySex === "male" ? <Male width={40} /> : <Female width={40} />}
        <Spacer variant="left" />
        <View>
          <Text style={{ color: "#FFF" }} numberOfLines={1}>
            {profileName}
          </Text>
          <Type>Perfil {profile.type}</Type>
        </View>
      </ProfileInfo>
      <Link style={{ borderBottomColor: "#FFF" }} onPress={onProfileChange}>
        <Text variant="bold" style={{ color: "#FFF" }}>
          Cambiar
        </Text>
      </Link>
    </ExchangeHeader>
  );
};
