import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

// HELPERS
import { openURL } from "../../../shared/helpers/functions";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../store/actions";

// ASSETS
import { Male } from "../../../assets/icons/male";
import { Female } from "../../../assets/icons/female";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { ProfileCompleted } from "../components/profile-completed.component";
import { Text } from "../../../components/typography/text.component";
import { Loader } from "../../../components/UI/loader.component";

// STYLED COMPONENTS
import { InfoWrapper, NavItem, RightArrow, ItemWrapper, ProfileScroll } from "../components/profile.styles";

export const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.authReducer.user),
    isLoading = useSelector((state) => state.profileReducer.isLoading),
    dispatch = useDispatch(),
    porfileName = user.name.split(" ");

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      dispatch(getUserData());
    }, [dispatch])
  );

  return (
    <SafeArea>
      {isLoading && <Loader />}
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
              <Text>Verificar identidad</Text>
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
