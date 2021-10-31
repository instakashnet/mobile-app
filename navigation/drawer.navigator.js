import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// ASSETS
import { Logo } from "../assets/illustrations/logo";

// NAVIGATORS
import { TabsNavigator } from "./tabs/tabs.navigator";

const AppDrawerNavigator = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <AppDrawerNavigator.Navigator screenOptions={{ headerShown: false }}>
      <AppDrawerNavigator.Screen name="App" component={TabsNavigator} />
    </AppDrawerNavigator.Navigator>
  );
};
