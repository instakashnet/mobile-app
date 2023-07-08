import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useTheme } from 'react-native-paper'

import AccountsScreen from '../screens/accounts/AccountsScreen'
import { MainHeader, TitleHeader } from './options'
import AccountFormScreen from '../screens/accounts/AccountFormScreen'

const Stack = createNativeStackNavigator()

export default function AccountsNavigator() {
  const { colors } = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="AllAccounts"
      screenOptions={{ header: props => <TitleHeader {...props} />, contentStyle: { backgroundColor: colors.white300 } }}>
      <Stack.Screen name="AllAccounts" options={{ header: props => <MainHeader {...props} /> }} component={AccountsScreen} />
      <Stack.Screen name="AccountForm" options={({ route }) => ({ title: route.params?.name })} component={AccountFormScreen} />
    </Stack.Navigator>
  )
}
