import React from 'react'
import * as AppleAuthentication from 'expo-apple-authentication'
import { Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useLazyGetSessionQuery, useLoginAppleMutation } from '../../services/auth'

export default function AppleLogin() {
  const [loginApple] = useLoginAppleMutation()
  const [getSession] = useLazyGetSessionQuery()
  const navigation = useNavigation()

  const handleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
      })

      const response = await loginApple({ token: credential.identityToken, apple_id: credential.user }).unwrap()
      if (!response.completed) return navigation.navigate('Complete')
      await getSession().unwrap()
    } catch (e) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // handle that the user canceled the sign-in flow
        console.log('Login apple cancelled')
      } else {
        // handle other errors
        console.log(e)
      }
    }
  }

  return (
    Platform.OS === 'ios' && (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ height: 44, width: '100%' }}
        onPress={handleSignIn}
      />
    )
  )
}
