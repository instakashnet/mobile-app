import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DocumentInstructionsScreen from '../screens/verification/document/DocumentInstructionsScreen'

const Stack = createNativeStackNavigator()

export default function DocumentNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='DocumentInstructions' component={DocumentInstructionsScreen} />
    </Stack.Navigator>
  )
}
