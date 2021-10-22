import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// UTILS
import { headerOptions, headerLeft } from "../utils/navigator.options";

// ASSETS
import { Logo } from "../../assets/illustrations/logo";

// NAVIGATORS
import { ExchangeNavigator } from "../exchange.navigator";

// SCREENS
import { HomeScreen } from "../../features/home/screens/home.screen";

const Tabs = createBottomTabNavigator();

const setBarIcon =
  (route) =>
  ({ focused }) => {
    let iconName;

    switch (route.name) {
      case "Home":
        iconName = "home-outline";
        break;
      case "Exchange":
        iconName = "swap-horizontal-outline";
        break;
      default:
        break;
    }

    return <Ionicons name={iconName} size={25} color={focused ? "#0D8284" : "#AFAFAF"} />;
  };

export const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: setBarIcon(route),
        tabBarStyle: {
          height: 80,
          paddingTop: 8,
          paddingBottom: 18,
        },
        tabBarActiveTintColor: "#0D8284",
        tabBarInactiveTintColor: "#AFAFAF",
      })}
    >
      <Tabs.Screen
        name="Home"
        options={{ tabBarLabel: "Inicio", headerShown: true, ...headerOptions, headerLeft, headerTitle: (props) => <Logo width={100} {...props} /> }}
        component={HomeScreen}
      />
      <Tabs.Screen name="Exchange" options={{ tabBarLabel: "Cambiar" }} component={ExchangeNavigator} />
    </Tabs.Navigator>
  );
};
