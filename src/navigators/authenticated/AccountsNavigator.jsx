import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useTheme } from 'react-native-paper'

import { MainHeader, TitleHeader } from '../options'
import AddPersonalAccountScreen from '@/screens/accounts/add-account/AddPersonalAccountScreen'
import AddThirdPArtyAccountScreen from '@/screens/accounts/add-account/AddThirdPartyAccountScreen'
import AccountsTabs from './tabs-navigators/accounts-tabs/AccountsTabs.navigator'

const Stack = createNativeStackNavigator()

export default function AccountsNavigator() {
  const { colors } = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="AllAccounts"
      screenOptions={{ header: props => <TitleHeader {...props} />, contentStyle: { backgroundColor: colors.white300 } }}>
      <Stack.Screen name="AllAccounts" options={{ header: props => <MainHeader {...props} /> }} component={AccountsTabs} />
      <Stack.Screen name="AddPersonalAccount" options={{ title: 'Agregar cuenta personal' }} component={AddPersonalAccountScreen} />
      <Stack.Screen name="AddThirdPartyAccount" options={{ title: 'Agregar cuenta tercero' }} component={AddThirdPArtyAccountScreen} />
    </Stack.Navigator>
  )
}
