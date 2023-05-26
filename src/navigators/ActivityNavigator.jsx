import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ActivityScreen from '../screens/activity/ActivityScreen'
import { MainHeader, TitleHeader } from './options'
import OrderDetailsScreen from '../screens/activity/OrderDetailsScreen'
import AllOperationsScreen from '../screens/activity/AllOperationsScreen'

const Stack = createNativeStackNavigator()

export default function MyOperationsNavigator() {
  return (
    <Stack.Navigator initialRouteName='MyActivity' screenOptions={{ header: (props) => <TitleHeader {...props} /> }}>
      <Stack.Screen name='MyActivity' options={{ header: (props) => <MainHeader {...props} /> }} component={ActivityScreen} />
      <Stack.Screen name='OrderDetails' options={{ title: 'Detalle' }} component={OrderDetailsScreen} />
      <Stack.Screen name='AllOperations' options={{ title: 'Operaciones' }} component={AllOperationsScreen} />
    </Stack.Navigator>
  )
}
