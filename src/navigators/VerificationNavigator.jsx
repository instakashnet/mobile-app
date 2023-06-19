import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TitleHeader } from './options'
import InstructionsScreen from '../screens/verification/InstructionsScreen'
import AddressScreen from '../screens/verification/AddressScreen'
import OccupationScreen from '../screens/verification/OccupationScreen'
import DocumentNavigator from './DocumentNavigator'
import VerifyingScreen from '../screens/verification/VerifyingScreen'

const Stack = createNativeStackNavigator()

export default function VerificationNavigator() {
  return (
    <Stack.Navigator initialRouteName='Instructions' screenOptions={{ header: (props) => <TitleHeader {...props} />, title: '' }}>
      <Stack.Screen name='Instructions' component={InstructionsScreen} />
      <Stack.Screen name='Address' component={AddressScreen} />
      <Stack.Screen name='Occupation' component={OccupationScreen} />
      <Stack.Screen name='Document' options={{ headerShown: false }} component={DocumentNavigator} />
      <Stack.Screen name='Verifying' component={VerifyingScreen} />
    </Stack.Navigator>
  )
}
