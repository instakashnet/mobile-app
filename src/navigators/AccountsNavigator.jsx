import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import AccountsScreen from '../screens/accounts/AccountsScreen'
import { MainHeader, TitleHeader } from './options'
import { useTheme } from 'react-native-paper'
import AccountFormScreen from '../screens/accounts/AccountFormScreen'

const Stack = createNativeStackNavigator()

export default function AccountsNavigator() {
  const { colors } = useTheme()

  return (
    <Stack.Navigator
      initialRouteName='AllAccounts'
      screenOptions={{ header: (props) => <TitleHeader {...props} />, contentStyle: { backgroundColor: colors.white300 } }}
    >
      <Stack.Screen name='AllAccounts' options={{ header: (props) => <MainHeader {...props} /> }} component={AccountsScreen} />
      <Stack.Screen name='AccountForm' options={{ title: 'Agregar cuenta' }} component={AccountFormScreen} />
    </Stack.Navigator>
  )
}
