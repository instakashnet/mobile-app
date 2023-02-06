import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
// REDUX
import { useSelector } from 'react-redux';
import { AddPersonalAccountScreen } from '../../features/accounts/screens/personal-account.screen';
import { AccountSelectScreen } from '../../features/exchange/screens/account-select.screen';
import { AccountsScreen } from '../../features/exchange/screens/accounts.screen';
// SCREENS
import { CalculatorScreen } from '../../features/exchange/screens/calculator.screen';
import { CompletedScreen } from '../../features/exchange/screens/completed.screen';
import { TransactionCodeScreen } from '../../features/exchange/screens/transaction-code.screen';
import { TransferScreen } from '../../features/exchange/screens/transfer.screen';
import { SelectProfileNavigator } from '../stacks/select-profile.navigator';
// UTILS
import { headerOptions, headerRight, headerTitle } from '../utils/navigator.options';

const ExchangeStack = createNativeStackNavigator();

export const ExchangeNavigator = () => {
  const profile = useSelector((state) => state.profileReducer.profile);

  return (
    <ExchangeStack.Navigator
      initialRouteName='Calculator'
      screenOptions={{
        ...headerOptions,
        headerRight,
        headerTitle: () => headerTitle('Cambia tus divisas'),
        headerBackTitle: '',
        gestureEnabled: false,
      }}
    >
      {profile && (
        <>
          <ExchangeStack.Screen name='Calculator' options={{ animationEnabled: false, headerBackVisible: false }} component={CalculatorScreen} />
          <ExchangeStack.Screen name='Accounts' options={{ headerBackVisible: false }} component={AccountsScreen} />
          <ExchangeStack.Screen name='AccountSelect' options={{ headerRight: null }} component={AccountSelectScreen} />
          <ExchangeStack.Screen name='AddAccount' options={{ headerTitle: () => headerTitle('Agregar cuenta'), headerRight: null }} component={AddPersonalAccountScreen} />
          <ExchangeStack.Screen name='Transfer' options={{ headerTitle: () => headerTitle('Transfiere'), headerBackVisible: false }} component={TransferScreen} />
          <ExchangeStack.Screen
            name='TransactionCode'
            options={{ headerTitle: () => headerTitle('Completar operación'), headerBackVisible: false }}
            component={TransactionCodeScreen}
          />
          <ExchangeStack.Screen name='Completed' options={{ headerShown: false }} component={CompletedScreen} />
        </>
      )}
      <ExchangeStack.Screen name='SelectProfile' options={{ animationEnabled: false, headerShown: false }} component={SelectProfileNavigator} />
    </ExchangeStack.Navigator>
  );
};
