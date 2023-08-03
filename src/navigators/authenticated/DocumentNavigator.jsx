import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DocumentInstructionsScreen from '@/screens/verification/document/DocumentInstructionsScreen'
import DocumentCameraScreen from '@/screens/verification/document/DocumentCameraScreen'
import DocumentPreviewScreen from '@/screens/verification/document/DocumentPreviewScreen'
import HeaderBackButton from '@/components/common/navigation/HeaderBackButton'

const Stack = createNativeStackNavigator()

export default function DocumentNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTitle: '',
        headerLeft: () => <HeaderBackButton iconProps={{ color: '#FFF' }} />,
      }}>
      <Stack.Screen name="DocumentInstructions" options={{ headerShown: false }} component={DocumentInstructionsScreen} />
      <Stack.Screen name="DocumentCamera" component={DocumentCameraScreen} />
      <Stack.Screen name="DocumentPreview" component={DocumentPreviewScreen} />
    </Stack.Navigator>
  )
}
