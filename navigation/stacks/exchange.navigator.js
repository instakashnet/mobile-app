import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// UTILS
import { headerOptions, headerLeft, headerBackLeft, headerRight } from "../utils/navigator.options";

// NAVIGATORS
import { AddAccountTabs } from "../tabs/add-account-tabs.navigatior";

// SCREENS
import { CalculatorScreen } from "../../features/exchange/screens/calculator.screen";
import { AccountsScreen } from "../../features/exchange/screens/accounts.screen";
import { AccountSelectScreen } from "../../features/exchange/screens/account-select.screen";
import { TransferCodeScreen } from "../../features/exchange/screens/transfer-code.screen";
import { CompletedScreen } from "../../features/exchange/screens/completed.screen";
import { SelectProfileScreen } from "../../features/profile/screens/select-profile.screen";

const ExchangeStack = createStackNavigator();

export const ExchangeNavigator = () => {
  return (
    <ExchangeStack.Navigator
      initialRouteName="Calculator"
      screenOptions={({ navigation }) => ({
        ...headerOptions,
        headerLeft,
        headerRight: () => headerRight(navigation),
        headerTitle: "Cambia tus divisas",
        headerBackTitle: "Volver",
        gestureEnabled: false,
      })}
    >
      <ExchangeStack.Screen name="SelectProfile" options={{ animationEnabled: false }} component={SelectProfileScreen} />
      <ExchangeStack.Screen name="Calculator" options={{ animationEnabled: false }} component={CalculatorScreen} />
      <ExchangeStack.Screen name="Accounts" component={AccountsScreen} />
      <ExchangeStack.Screen
        name="AccountSelect"
        options={({ navigation }) => ({ presentation: "modal", headerRight: null, headerLeft: () => headerBackLeft(navigation) })}
        component={AccountSelectScreen}
      />
      <ExchangeStack.Screen
        name="AddAccount"
        options={({ navigation }) => ({ headerTitle: "Agregar cuenta", headerRight: null, headerLeft: () => headerBackLeft(navigation) })}
        component={AddAccountTabs}
      />
      <ExchangeStack.Screen name="TransferCode" options={{ headerTitle: "Completar operación", headerRight: null }} component={TransferCodeScreen} />
      <ExchangeStack.Screen name="Completed" options={{ headerTitle: "¡Solicitud completada!", headerRight: null }} component={CompletedScreen} />
    </ExchangeStack.Navigator>
  );
};
