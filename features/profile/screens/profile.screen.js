import React, { useEffect } from "react";
import { View } from "react-native";
import { Badge } from "react-native-paper";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Female } from "../../../assets/icons/female";
// ASSETS
import { Male } from "../../../assets/icons/male";
import { Text } from "../../../components/typography/text.component";
// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
// HELPERS
import { openURL } from "../../../shared/helpers/functions";
import { connectWebsocket, disconnectWebsocket } from "../../../store/actions";
import { ProfileCompleted } from "../components/profile-completed.component";
// STYLED COMPONENTS
import { InfoWrapper, ItemWrapper, NavItem, ProfileScroll, RightArrow } from "../components/profile.styles";

export const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.authReducer.user),
    dispatch = useDispatch(),
    porfileName = user.name.split(" ");

  // EFFECTS
  useEffect(() => {
    dispatch(connectWebsocket("validation"));

    return () => dispatch(disconnectWebsocket());
  }, []);

  return (
    <SafeArea>
      <ProfileScroll>
        <InfoWrapper>
          {user.identitySex === "male" ? <Male width={80} /> : <Female width={80} />}
          <Spacer variant="top" />
          <Text variant="subtitle" style={{ color: "#FFF" }}>
            {porfileName.length > 2 ? `${porfileName[0]} ${porfileName[2]}` : `${porfileName[0]} ${porfileName[1]}`}
          </Text>
          <Text style={{ color: "#FFF" }}>{user.username}</Text>
        </InfoWrapper>
        <Spacer variant="top" size={3} />
        <ProfileCompleted user={user} />
        <Spacer variant="top" size={3} />
        <NavItem onPress={() => navigation.navigate("BasicInfo", { user })}>
          <ItemWrapper>
            <Text>Datos personales</Text>
            <RightArrow />
          </ItemWrapper>
        </NavItem>
        {user.identityDocumentValidation !== "success" && (
          <NavItem onPress={() => navigation.navigate("ValidateDocument", { user })}>
            <ItemWrapper>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>Verificar identidad</Text>
                {user.identityDocumentValidation === "failed" && (
                  <Badge style={{ marginLeft: 10, borderRadius: 5, height: 23, color: "#FF4B55", backgroundColor: "#FEE2E0" }}>error</Badge>
                )}
              </View>
              <RightArrow />
            </ItemWrapper>
          </NavItem>
        )}
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
      </ProfileScroll>
    </SafeArea>
  );
};
