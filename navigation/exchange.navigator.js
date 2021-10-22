import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// UTILS
import { headerOptions } from "./utils/navigator.options";

// NAVIGATORS
import { AddAccountTabs } from "./tabs/add-account-tabs.navigatior";

// SCREENS
import { CalculatorScreen } from "../features/exchange/screens/calculator.screen";
import { AccountsScreen } from "../features/exchange/screens/accounts.screen";
import { AccountSelectScreen } from "../features/exchange/screens/account-select.screen";
import { TransferCodeScreen } from "../features/exchange/screens/transfer-code.screen";

const ExchangeStack = createStackNavigator();

export const ExchangeNavigator = () => {
  return (
    <ExchangeStack.Navigator screenOptions={{ ...headerOptions, headerTitle: "Cambia tus divisas", headerBackTitle: "Volver" }}>
      <ExchangeStack.Screen name="Calculator" component={CalculatorScreen} />
      <ExchangeStack.Screen name="Accounts" options={{ headerLeft: null }} component={AccountsScreen} />
      <ExchangeStack.Screen name="AccountSelect" component={AccountSelectScreen} />
      <ExchangeStack.Screen name="AddAccount" options={{ headerTitle: "Agregar cuenta" }} component={AddAccountTabs} />
      <ExchangeStack.Screen name="TransferCode" options={{ headerTitle: "Completar operación", headerLeft: null }} component={TransferCodeScreen} />
    </ExchangeStack.Navigator>
  );
};
