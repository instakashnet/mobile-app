import { useNavigation } from '@react-navigation/core'
import * as AppleAuthentication from 'expo-apple-authentication'
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'

import { useLazyGetSessionQuery, useLoginAppleMutation } from '../../../services/auth'

export function useAppleLogin() {
  const [loginApple, { isLoading }] = useLoginAppleMutation()
  const [isSignInAvailable, setIsSignInAvailable] = useState(false)
  const [getSession] = useLazyGetSessionQuery()
  const { navigate } = useNavigation()

  useEffect(() => {
    const checkIsAppleSignInAvailable = async () => {
      try {
        const isAvailable = await AppleAuthentication.isAvailableAsync()
        setIsSignInAvailable(isAvailable)
      } catch (error) {
        console.log('Error checking if apple sign in is available', error)
      }
    }
    checkIsAppleSignInAvailable()
  }, [])

  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
      })

      console.log({ decodedToken: jwtDecode(credential.identityToken) })

      const response = await loginApple({ token: credential.identityToken, apple_id: credential.user }).unwrap()
      if (!response.completed) return navigate('Complete')
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

  return {
    handleAppleLogin,
    isLoading,
    isSignInAvailable,
  }
}
