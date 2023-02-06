import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
// UTILS
import { headerLeft, headerOptions, headerRight, headerTitle } from '../utils/navigator.options';
// NAVIGATORS
// import { AddAccountTabs } from "../tabs/add-account-tabs.navigatior";
// SCREENS
import { AccountDetailsScreen } from '../../features/accounts/screens/account-details.screen';
import { AccountsScreen } from '../../features/accounts/screens/accounts.screen';
import { EditAccountScreen } from '../../features/accounts/screens/edit-account.screen';
import { AddPersonalAccountScreen } from '../../features/accounts/screens/personal-account.screen';

const AccountsStack = createNativeStackNavigator();

export const AccountsNavigator = () => {
  return (
    <AccountsStack.Navigator screenOptions={{ ...headerOptions, headerRight }}>
      <AccountsStack.Screen
        name='MyAccounts'
        options={({ navigation }) => ({ headerTitle: () => headerTitle('Mis cuentas'), headerLeft: () => headerLeft(navigation) })}
        component={AccountsScreen}
      />
      <AccountsStack.Screen name='AddAccount' options={{ headerTitle: () => headerTitle('Agregar cuenta') }} component={AddPersonalAccountScreen} />
      <AccountsStack.Screen name='AccountDetails' options={{ headerTitle: () => headerTitle('Detalles de la cuenta') }} component={AccountDetailsScreen} />
      <AccountsStack.Screen name='EditAccount' options={{ headerTitle: () => headerTitle('Editar cuenta') }} component={EditAccountScreen} />
    </AccountsStack.Navigator>
  );
};
