import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// SCREENS
import { AddPersonalAccountScreen } from "../../features/accounts/screens/personal-account.screen";
import { AddThirdAccountScreen } from "../../features/accounts/screens/third-account.screen";

const TopTabsNavigator = createMaterialTopTabNavigator();

export const AddAccountTabs = ({ route }) => {
  const currencyId = route.params ? route.params.currencyToReceive : null;

  return (
    <TopTabsNavigator.Navigator>
      <TopTabsNavigator.Screen name="AddPersonalAccount" options={{ tabBarLabel: "Personal" }} initialParams={{ currencyId }} component={AddPersonalAccountScreen} />
      <TopTabsNavigator.Screen name="AddThirdAccount" options={{ tabBarLabel: "De tercero" }} initialParams={{ currencyId }} component={AddThirdAccountScreen} />
    </TopTabsNavigator.Navigator>
  );
};
