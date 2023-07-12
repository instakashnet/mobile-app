import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useSelector } from 'react-redux'

import AddressScreen from '../screens/verification/AddressScreen'
import InstructionsScreen from '../screens/verification/InstructionsScreen'
import OccupationScreen from '../screens/verification/OccupationScreen'
import VerifyingScreen from '../screens/verification/VerifyingScreen'
import { selectUser } from '../store/slices/authSlice'
import DocumentNavigator from './DocumentNavigator'
import { TitleHeader } from './options'

const Stack = createNativeStackNavigator()

export default function VerificationNavigator() {
  const user = useSelector(selectUser)

  return (
    <Stack.Navigator initialRouteName="Instructions" screenOptions={{ header: props => <TitleHeader {...props} />, title: '' }}>
      <Stack.Screen name="Instructions" component={InstructionsScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen name="Occupation" component={OccupationScreen} />
      <Stack.Screen name="Document" options={{ headerShown: false }} component={DocumentNavigator} />
      <Stack.Screen name="Verifying" component={VerifyingScreen} />
    </Stack.Navigator>
  )
}
