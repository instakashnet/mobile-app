import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
// REDUX
import { useSelector } from "react-redux";
import { AccountSelectScreen } from "../../features/exchange/screens/account-select.screen";
import { AccountsScreen } from "../../features/exchange/screens/accounts.screen";
// SCREENS
import { CalculatorScreen } from "../../features/exchange/screens/calculator.screen";
import { CompletedScreen } from "../../features/exchange/screens/completed.screen";
import { TransactionCodeScreen } from "../../features/exchange/screens/transaction-code.screen";
import { TransferScreen } from "../../features/exchange/screens/transfer.screen";
import { SelectProfileNavigator } from "../stacks/select-profile.navigator";
// NAVIGATORS
import { AddAccountTabs } from "../tabs/add-account-tabs.navigatior";
// UTILS
import { headerBackLeft, headerLeft, headerOptions, headerRight, headerTitle } from "../utils/navigator.options";

const ExchangeStack = createStackNavigator();

export const ExchangeNavigator = () => {
  const profile = useSelector((state) => state.profileReducer.profile);

  return (
    <ExchangeStack.Navigator
      initialRouteName="Calculator"
      screenOptions={({ navigation }) => ({
        ...headerOptions,
        headerLeft: () => headerLeft(navigation),
        headerRight,
        headerTitle: () => headerTitle("Cambia tus divisas"),
        headerBackTitle: "Volver",
        gestureEnabled: false,
      })}
    >
      {profile && (
        <>
          <ExchangeStack.Screen name="Calculator" options={{ animationEnabled: false }} component={CalculatorScreen} />
          <ExchangeStack.Screen name="Accounts" component={AccountsScreen} />
          <ExchangeStack.Screen
            name="AccountSelect"
            options={({ navigation }) => ({ presentation: "modal", headerRight: null, headerLeft: () => headerBackLeft(navigation) })}
            component={AccountSelectScreen}
          />
          <ExchangeStack.Screen
            name="AddAccount"
            options={({ navigation }) => ({ headerTitle: () => headerTitle("Agregar cuenta"), headerRight: null, headerLeft: () => headerBackLeft(navigation) })}
            component={AddAccountTabs}
          />
          <ExchangeStack.Screen name="Transfer" options={{ headerTitle: () => headerTitle("Transfiere") }} component={TransferScreen} />
          <ExchangeStack.Screen name="TransactionCode" options={{ headerTitle: () => headerTitle("Completar operación") }} component={TransactionCodeScreen} />
          <ExchangeStack.Screen name="Completed" options={{ headerTitle: () => headerTitle("¡Solicitud completada!"), headerRight: null }} component={CompletedScreen} />
        </>
      )}
      <ExchangeStack.Screen name="SelectProfile" options={{ animationEnabled: false, headerShown: false }} component={SelectProfileNavigator} />
    </ExchangeStack.Navigator>
  );
};
