import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// UTILS
import { headerOptions, headerLeft } from "../utils/navigator.options";

// ASSETS
import { Logo } from "../../assets/illustrations/logo";

// NAVIGATORS
import { ExchangeNavigator } from "../exchange.navigator";
import { AccountsNavigator } from "../accounts.navigator";

// SCREENS
import { HomeScreen } from "../../features/home/screens/home.screen";

const Tabs = createBottomTabNavigator();

const setBarIcon =
  (route) =>
  ({ focused }) => {
    let iconName;

    switch (route.name) {
      case "Home":
        iconName = "home";
        break;
      case "Exchange":
        iconName = "swap-horizontal";
        break;
      case "Accounts":
        iconName = "bank";
        break;
      default:
        break;
    }

    return <MaterialCommunityIcons name={iconName} size={25} color={focused ? "#0D8284" : "#AFAFAF"} />;
  };

export const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: setBarIcon(route),
        tabBarStyle: {
          height: 80,
          paddingTop: 13,
          paddingBottom: 20,
        },
        tabBarActiveTintColor: "#0D8284",
        tabBarInactiveTintColor: "#AFAFAF",
      })}
    >
      <Tabs.Screen
        name="Home"
        options={{ tabBarLabel: "Inicio", headerShown: true, ...headerOptions, headerLeft, headerTitle: (props) => <Logo width={100} /> }}
        component={HomeScreen}
      />
      <Tabs.Screen name="Exchange" options={{ tabBarLabel: "Cambiar" }} component={ExchangeNavigator} />
      <Tabs.Screen name="Accounts" options={{ tabBarLabel: "Mis cuentas" }} component={AccountsNavigator} />
    </Tabs.Navigator>
  );
};
