import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import ActivityScreen from '../screens/activity/ActivityScreen'
import OrderDetailsScreen from '../screens/activity/OrderDetailsScreen'
import OrdersScreen from '../screens/activity/OrdersScreen'
import WithdrawalDetailsScreen from '../screens/activity/WithdrawalDetailsScreen'
import WithdrawalsScreen from '../screens/activity/WithdrawsScreen'
import { MainHeader, TitleHeader } from './options'

const Stack = createNativeStackNavigator()

export default function MyOperationsNavigator() {
  return (
    <Stack.Navigator initialRouteName="MyActivity" screenOptions={{ header: props => <TitleHeader {...props} /> }}>
      <Stack.Screen name="MyActivity" options={{ header: props => <MainHeader {...props} /> }} component={ActivityScreen} />
      <Stack.Screen name="OrderDetails" options={{ title: 'Detalle' }} component={OrderDetailsScreen} />
      <Stack.Screen name="Orders" options={{ title: 'Operaciones' }} component={OrdersScreen} />
      <Stack.Screen name="Withdrawals" options={{ title: 'Retiros' }} component={WithdrawalsScreen} />
      <Stack.Screen name="WithdrawalDetails" options={{ title: 'Detalle' }} component={WithdrawalDetailsScreen} />
    </Stack.Navigator>
  )
}
