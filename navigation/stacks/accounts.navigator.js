import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// UTILS
import { headerOptions, headerLeft, headerBackLeft, headerRight } from "../utils/navigator.options";
// NAVIGATORS
import { AddAccountTabs } from "../tabs/add-account-tabs.navigatior";
// SCREENS
import { AccountsScreen } from "../../features/accounts/screens/accounts.screen";
import { AccountDetails } from "../../features/accounts/screens/account-details.screen";

const AccountsStack = createStackNavigator();

export const AccountsNavigator = () => {
  return (
    <AccountsStack.Navigator screenOptions={({ navigation }) => ({ ...headerOptions, headerLeft, headerRight: () => headerRight(navigation) })}>
      <AccountsStack.Screen name="MyAccounts" options={{ headerTitle: "Mis cuentas" }} component={AccountsScreen} />
      <AccountsStack.Screen
        name="AddAccount"
        options={({ navigation }) => ({ headerTitle: "Agregar cuenta", headerLeft: () => headerBackLeft(navigation) })}
        component={AddAccountTabs}
      />
      <AccountsStack.Screen
        name="AccountDetails"
        options={({ navigation }) => ({ headerTitle: "Detalles de la cuenta", headerLeft: () => headerBackLeft(navigation) })}
        component={AccountDetails}
      />
    </AccountsStack.Navigator>
  );
};
