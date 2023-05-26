import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TitleHeader } from './options'
import InstructionsScreen from '../screens/verification/InstructionsScreen'
import AddressScreen from '../screens/verification/AddressScreen'
import OccupationScreen from '../screens/verification/OccupationScreen'
import DocumentNavigator from './DocumentNavigator'
import DocumentCameraScreen from '../screens/verification/document/DocumentCameraScreen'

const Stack = createNativeStackNavigator()

export default function VerificationNavigator() {
  return (
    <Stack.Navigator initialRouteName='Instructions' screenOptions={{ header: (props) => <TitleHeader {...props} />, title: '' }}>
      <Stack.Screen name='Instructions' component={InstructionsScreen} />
      <Stack.Screen name='Address' component={AddressScreen} />
      <Stack.Screen name='Occupation' component={OccupationScreen} />
      <Stack.Screen name='Document' component={DocumentNavigator} />
      <Stack.Screen name='DocumentCamera' component={DocumentCameraScreen} />
    </Stack.Navigator>
  )
}
