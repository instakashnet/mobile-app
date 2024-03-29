import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '@/screens/home/HomeScreen'
import OrderDetailsScreen from '@/screens/activity/OrderDetailsScreen'
import { MainHeader, TitleHeader } from '../options'
import ReferralScreen from '@/screens/home/ReferralScreen'
import WithdrawKashScreen from '@/screens/home/WithdrawKashScreen'

const Stack = createNativeStackNavigator()

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        header: props => <TitleHeader {...props} />,
      }}>
      <Stack.Screen name="HomeScreen" options={{ header: props => <MainHeader {...props} /> }} component={HomeScreen} />
      <Stack.Screen name="ReferralScreen" options={{ title: 'Refiere y gana' }} component={ReferralScreen} />
      <Stack.Screen name="OrderDetails" options={{ title: 'Detalles' }} component={OrderDetailsScreen} />
      <Stack.Screen name="WithdrawKash" options={{ title: 'Retirar KASH' }} component={WithdrawKashScreen} />
    </Stack.Navigator>
  )
}
