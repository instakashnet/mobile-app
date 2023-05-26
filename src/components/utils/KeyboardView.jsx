import { KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'

export default function KeyboardView({ children }) {
  return (
    <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {children}
    </KeyboardAvoidingView>
  )
}
