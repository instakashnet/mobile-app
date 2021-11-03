import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// UTILS
import { headerOptions, headerBackLeft, headerRight } from "../utils/navigator.options";

// SCREENS
import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import { BasicInfoScreen } from "../../features/profile/screens/information/basic-info.screen";
import { EditInfoScreen } from "../../features/profile/screens/information/edit-info.screen";

const ProfileStack = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={({ navigation }) => ({ ...headerOptions, headerLeft: () => headerBackLeft(navigation), headerRight: () => headerRight(navigation) })}>
      <ProfileStack.Screen name="MyProfile" options={{ headerTitle: "Mi perfil" }} component={ProfileScreen} />
      <ProfileStack.Screen name="BasicInfo" options={{ headerTitle: "Datos básicos" }} component={BasicInfoScreen} />
      <ProfileStack.Screen name="EditInfo" options={{ headerTitle: "Editar información" }} component={EditInfoScreen} />
    </ProfileStack.Navigator>
  );
};
