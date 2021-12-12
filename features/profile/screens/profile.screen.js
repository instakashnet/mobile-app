import React from "react";
import { Bar as ProgressBar } from "react-native-progress";
import { Dimensions } from "react-native";
import { useProfileCompleted } from "../../../hooks/use-completed.hook";

// HELPERS
import { openURL } from "../../../shared/helpers/functions";

// REDUX
import { useSelector } from "react-redux";

// ASSETS
import { Male } from "../../../assets/icons/male";
import { Female } from "../../../assets/icons/female";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { InfoWrapper, NavItem, RightArrow, ItemWrapper } from "../components/profile.styles";
import { Text } from "../../../components/typography/text.component";

export const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.authReducer.user),
    porfileName = user.name.split(" ");

  const [percentage, color] = useProfileCompleted(user);

  console.log(percentage, color);

  return (
    <SafeArea>
      <InfoWrapper>
        {user.identitySex === "male" ? <Male width={80} /> : <Female width={80} />}
        <Spacer variant="top" />
        <Text variant="subtitle" style={{ color: "#FFF" }}>
          {porfileName.length > 2 ? `${porfileName[0]} ${porfileName[2]}` : `${porfileName[0]} ${porfileName[1]}`}
        </Text>
        <Text style={{ color: "#FFF" }}>{user.username}</Text>
      </InfoWrapper>
      <Spacer variant="top" size={3} />
      <ProgressBar progress={percentage / 100} color={color} width={Dimensions.get("window").width / 1.3} height={10} />
      <Spacer variant="top" size={3} />
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
      <NavItem onPress={() => openURL("https://instakash.net/faq")}>
        <ItemWrapper>
          <Text>Centro de ayuda</Text>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
    </SafeArea>
  );
};
