import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// UTILS
import { headerOptions, headerLeft } from "./utils/navigator.options";

// ASSETS
import { Logo } from "../assets/illustrations/logo";

// SCREENS
import { SelectProfileScreen } from "../features/profile/screens/select-profile.screen";
import { AddProfileScreen } from "../features/profile/screens/add-profile.screen";

const SelectStack = createStackNavigator();

export const SelectProfileNavigator = () => {
  return (
    <SelectStack.Navigator
      initialRouteName="SelectProfile"
      screenOptions={{
        ...headerOptions,
        headerLeft,
      }}>
      <SelectStack.Screen options={{ headerTitle: (props) => <Logo {...props} width={100} /> }} name="SelectProfile" component={SelectProfileScreen} />
      <SelectStack.Screen name="AddProfile" options={{ headerTitle: "Agregar empresa", headerBackTitleVisible: false }} component={AddProfileScreen} />
    </SelectStack.Navigator>
  );
};
