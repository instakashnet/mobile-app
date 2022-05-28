import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { topBarOptions } from "../utils/navigator.options";

// SCREENS
import { AffiliateCodeScreen } from "../../features/affiliates/screens/affiliate-code.screen";
import { AffiliatesListScreen } from "../../features/affiliates/screens/affiliates-list.screen";

const TopTabsNavigator = createMaterialTopTabNavigator();

export const AffiliatesTabs = () => {
  return (
    <TopTabsNavigator.Navigator screenOptions={{ ...topBarOptions }}>
      <TopTabsNavigator.Screen name="Steps" options={{ tabBarLabel: "Compartir" }} component={AffiliateCodeScreen} />
      <TopTabsNavigator.Screen name="Myreferrals" options={{ tabBarLabel: "Mis referidos" }} component={AffiliatesListScreen} />
    </TopTabsNavigator.Navigator>
  );
};
