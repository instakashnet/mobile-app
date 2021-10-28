import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// UTILS
import { headerOptions } from "./utils/navigator.options";
// SCREENS
import { AccountsScreen } from "../features/accounts/screens/accounts.screen";

const AccountsStack = createStackNavigator();

export const AccountsNavigator = () => {
  return (
    <AccountsStack.Navigator screenOptions={{ ...headerOptions }}>
      <AccountsStack.Screen name="MyAccounts" options={{ headerTitle: "Mis cuentas" }} component={AccountsScreen} />
    </AccountsStack.Navigator>
  );
};
