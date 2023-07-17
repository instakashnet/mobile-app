import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'

export default function KeyboardView({ children }) {
  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {children}
    </KeyboardAvoidingView>
  )
}
