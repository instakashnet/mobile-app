import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DocumentInstructionsScreen from '@/screens/verification/document/DocumentInstructionsScreen'
import DocumentCameraScreen from '@/screens/verification/document/DocumentCameraScreen'
import DocumentPreviewScreen from '@/screens/verification/document/DocumentPreviewScreen'

const Stack = createNativeStackNavigator()

export default function DocumentNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DocumentInstructions" component={DocumentInstructionsScreen} />
      <Stack.Screen name="DocumentCamera" component={DocumentCameraScreen} />
      <Stack.Screen name="DocumentPreview" component={DocumentPreviewScreen} />
    </Stack.Navigator>
  )
}
