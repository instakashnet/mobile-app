import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Dimensions } from "react-native";
// COMPONENTS
import { CustomDrawer } from "../components/UI/drawer/drawer.component";
import BiometricsScreen from "../features/security/screens/biometrics.screen";
import { AffiliatesNavigator } from "./stacks/affiliates.navigator";
import { NotificationsNavigator } from "./stacks/notifications.navigator";
import { ProfileNavigator } from "./stacks/profile.navigator";
// NAVIGATORS
import { TabsNavigator } from "./tabs/tabs.navigator";
import { headerBackLeft, headerOptions, headerTitle } from "./utils/navigator.options";

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
      <AppDrawerNavigator.Screen name="Notifications" component={NotificationsNavigator} />
      <AppDrawerNavigator.Screen
        name="Biometrics"
        options={({ navigation }) => ({
          headerShown: true,
          ...headerOptions,
          headerLeft: () => headerBackLeft(navigation),
          headerTitle: () => headerTitle("Inicio rápido de sesión"),
        })}
        component={BiometricsScreen}
      />
    </AppDrawerNavigator.Navigator>
  );
};
