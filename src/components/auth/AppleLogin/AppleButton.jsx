import * as AppleAuthentication from 'expo-apple-authentication'
import React from 'react'
import { Platform } from 'react-native'

import { useAppleLogin } from './AppleLogin.logic'

export default function AppleButton() {
  const { handleAppleLogin, isSignInAvailable } = useAppleLogin()

  return isSignInAvailable
    ? Platform.OS === 'ios' && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={{ height: 44, width: '100%' }}
          onPress={handleAppleLogin}
        />
      )
    : null
}
