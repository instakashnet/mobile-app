import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
// UTILS
import { headerBackLeft, headerLeft, headerOptions, headerRight, headerTitle } from "../utils/navigator.options";
// NAVIGATORS
// import { AddAccountTabs } from "../tabs/add-account-tabs.navigatior";
// SCREENS
import { AccountDetailsScreen } from "../../features/accounts/screens/account-details.screen";
import { AccountsScreen } from "../../features/accounts/screens/accounts.screen";
import { EditAccountScreen } from "../../features/accounts/screens/edit-account.screen";
import { AddPersonalAccountScreen } from "../../features/accounts/screens/personal-account.screen";

const AccountsStack = createStackNavigator();

export const AccountsNavigator = () => {
  return (
    <AccountsStack.Navigator screenOptions={({ navigation }) => ({ ...headerOptions, headerLeft: () => headerLeft(navigation), headerRight })}>
      <AccountsStack.Screen name="MyAccounts" options={{ headerTitle: () => headerTitle("Mis cuentas") }} component={AccountsScreen} />
      <AccountsStack.Screen
        name="AddAccount"
        options={({ navigation }) => ({ headerTitle: () => headerTitle("Agregar cuenta"), headerLeft: () => headerBackLeft(navigation) })}
        component={AddPersonalAccountScreen}
      />
      <AccountsStack.Screen
        name="AccountDetails"
        options={({ navigation }) => ({ headerTitle: () => headerTitle("Detalles de la cuenta"), headerLeft: () => headerBackLeft(navigation) })}
        component={AccountDetailsScreen}
      />
      <AccountsStack.Screen
        name="EditAccount"
        options={({ navigation }) => ({ headerTitle: () => headerTitle("Editar cuenta"), headerLeft: () => headerBackLeft(navigation) })}
        component={EditAccountScreen}
      />
    </AccountsStack.Navigator>
  );
};
