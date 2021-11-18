import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// UTILS
import { headerOptions, headerLeft, headerBackLeft, headerRight } from "../utils/navigator.options";

// ASSETS
import { Logo } from "../../assets/illustrations/logo";

// SCREENS
import { SelectProfileScreen } from "../../features/profile/screens/select-profile.screen";
import { AddProfileScreen } from "../../features/profile/screens/add-profile.screen";

const SelectStack = createStackNavigator();

export const SelectProfileNavigator = () => {
  return (
    <SelectStack.Navigator
      initialRouteName="Select"
      screenOptions={({ navigation }) => ({
        ...headerOptions,
        headerLeft,
        headerRight: () => headerRight(navigation),
      })}
    >
      <SelectStack.Screen options={{ headerTitle: (props) => <Logo width={100} /> }} name="Select" component={SelectProfileScreen} />
      <SelectStack.Screen
        name="AddProfile"
        options={({ navigation }) => ({ headerTitle: "Agregar empresa", headerLeft: () => headerBackLeft(navigation), headerBackTitleVisible: false })}
        component={AddProfileScreen}
      />
    </SelectStack.Navigator>
  );
};
