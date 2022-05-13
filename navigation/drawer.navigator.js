import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Dimensions } from "react-native";
// COMPONENTS
import { CustomDrawer } from "../components/UI/drawer/drawer.component";
import { AffiliatesNavigator } from "./stacks/affiliates.navigator";
import { ProfileNavigator } from "./stacks/profile.navigator";
// NAVIGATORS
import { TabsNavigator } from "./tabs/tabs.navigator";

const AppDrawerNavigator = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <AppDrawerNavigator.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false, drawerStyle: { width: Dimensions.get("screen").width }, drawerPosition: "left", drawerType: "front" }}
    >
      <AppDrawerNavigator.Screen name="App" component={TabsNavigator} />
      <AppDrawerNavigator.Screen name="Profile" component={ProfileNavigator} />
      <AppDrawerNavigator.Screen name="Affiliates" component={AffiliatesNavigator} />
    </AppDrawerNavigator.Navigator>
  );
};
