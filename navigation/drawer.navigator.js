import React from "react";
import { Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// NAVIGATORS
import { TabsNavigator } from "./tabs/tabs.navigator";
import { ProfileNavigator } from "./stacks/profile.navigator";

// COMPONENTS
import { CustomDrawer } from "../components/UI/drawer/drawer.component";

const AppDrawerNavigator = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <AppDrawerNavigator.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false, drawerStyle: { width: Dimensions.get("screen").width }, drawerPosition: "right", drawerType: "front" }}
    >
      <AppDrawerNavigator.Screen name="App" component={TabsNavigator} />
      <AppDrawerNavigator.Screen name="Profile" component={ProfileNavigator} />
    </AppDrawerNavigator.Navigator>
  );
};
