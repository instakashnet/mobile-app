import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { useProfile } from '../hooks/useProfile'
import AccountFormScreen from '../screens/accounts/AccountFormScreen'
import AddProfileScreen from '../screens/configuration/AddProfile/AddProfileScreen'
import ProfilesScreen from '../screens/configuration/ProfilesScreen'
import AccountsScreen from '../screens/exchange/AccountsScreen'
import CalculatorScreen from '../screens/exchange/Calculator/CalculatorScreen'
import SuccessScreen from '../screens/exchange/SuccessScreen'
import TransferScreen from '../screens/exchange/TransferScreen'
import { MainHeader, TitleHeader } from './options'

const Stack = createNativeStackNavigator()

export default function ExchangeNavigator() {
  const { profile } = useProfile()

  return (
    <Stack.Navigator
      initialRouteName={!profile ? 'SelectProfile' : 'Calculator'}
      screenOptions={{ header: props => <TitleHeader {...props} /> }}>
      <Stack.Screen name="SelectProfile" options={{ header: props => <MainHeader {...props} /> }} component={ProfilesScreen} />
      <Stack.Screen name="AddProfile" options={{ title: 'Agregar empresa' }} component={AddProfileScreen} />
      <Stack.Screen name="Calculator" options={{ header: props => <MainHeader {...props} /> }} component={CalculatorScreen} />
      <Stack.Screen name="SelectAccounts" options={{ title: 'Seleccionar cuentas', headerLeft: null }} component={AccountsScreen} />
      <Stack.Screen name="AddAccount" options={{ title: 'Agregar cuenta' }} component={AccountFormScreen} />
      <Stack.Screen name="Transfer" options={{ title: 'Transferir', headerLeft: null }} component={TransferScreen} />
      <Stack.Screen name="TransferSuccess" options={{ title: '', headerLeft: null }} component={SuccessScreen} />
    </Stack.Navigator>
  )
}
