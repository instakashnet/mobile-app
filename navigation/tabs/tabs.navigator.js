import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// UTILS
import { headerOptions, headerLeft, headerRight } from "../utils/navigator.options";

// ASSETS
import { Logo } from "../../assets/illustrations/logo";

// NAVIGATORS
import { ExchangeNavigator } from "../stacks/exchange.navigator";
import { AccountsNavigator } from "../stacks/accounts.navigator";
import { ActivityNavigator } from "../stacks/activity.navigator";
import { AffiliatesTabs } from "../tabs/affiliates-tabs.navigator";

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
      case "Activity":
        iconName = "chart-bar";
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
        tabBarIcon: setBarIcon(route),
        tabBarStyle: {
          height: 80,
          paddingTop: 15,
          paddingBottom: 23,
        },
        tabBarActiveTintColor: "#0D8284",
        tabBarInactiveTintColor: "#AFAFAF",
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name="Home"
        options={({ navigation }) => ({
          tabBarLabel: "Inicio",
          headerShown: true,
          ...headerOptions,
          headerLeft,
          headerRight: () => headerRight(navigation),
          headerTitle: () => <Logo width={100} />,
        })}
        component={HomeScreen}
      />
      <Tabs.Screen name="Exchange" options={{ tabBarLabel: "Cambiar" }} component={ExchangeNavigator} />
      <Tabs.Screen name="Activity" options={{ tabBarLabel: "Mis cambios" }} component={ActivityNavigator} />
      <Tabs.Screen name="Accounts" options={{ tabBarLabel: "Mis cuentas" }} component={AccountsNavigator} />
      <Tabs.Screen
        name="Affiliates"
        options={({ navigation }) => ({
          tabBarButton: () => null,
          headerShown: true,
          ...headerOptions,
          headerLeft,
          headerTitle: "Mis afiliados",
          headerRight: () => headerRight(navigation),
        })}
        component={AffiliatesTabs}
      />
    </Tabs.Navigator>
  );
};
