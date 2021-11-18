import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { topBarOptions } from "../utils/navigator.options";

// SCREENS
import { AffiliateStepsScreen } from "../../features/affiliates/screens/affiliate-steps.screen";
import { AffiliatesListScreen } from "../../features/affiliates/screens/affiliates-list.screen";

const TopTabsNavigator = createMaterialTopTabNavigator();

export const AffiliatesTabs = () => {
  return (
    <TopTabsNavigator.Navigator screenOptions={{ ...topBarOptions }}>
      <TopTabsNavigator.Screen name="Steps" options={{ tabBarLabel: "Compartir" }} component={AffiliateStepsScreen} />
      <TopTabsNavigator.Screen name="Myreferrals" options={{ tabBarLabel: "Mis referidos" }} component={AffiliatesListScreen} />
    </TopTabsNavigator.Navigator>
  );
};
