import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// SCREENS
import { AddPersonalAccountScreen } from "../../features/accounts/screens/personal-account.screen";
import { AddThirdAccountScreen } from "../../features/accounts/screens/third-account.screen";

const TopTabsNavigator = createMaterialTopTabNavigator();

export const AddAccountTabs = () => {
  return (
    <TopTabsNavigator.Navigator>
      <TopTabsNavigator.Screen name="AddPersonalAccount" options={{ tabBarLabel: "Personal" }} component={AddPersonalAccountScreen} />
      <TopTabsNavigator.Screen name="AddThirdAccount" options={{ tabBarLabel: "De tercero" }} component={AddThirdAccountScreen} />
    </TopTabsNavigator.Navigator>
  );
};
