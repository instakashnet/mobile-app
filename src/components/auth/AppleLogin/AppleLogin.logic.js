import { useNavigation } from '@react-navigation/core'
import * as AppleAuthentication from 'expo-apple-authentication'
import { useEffect, useState } from 'react'

import { useLazyGetSessionQuery, useLoginAppleMutation } from '../../../services/auth'
import { getSecureData, removeSecureData, storeSecureData } from '@/lib/SecureStore'

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
      let loginCredentials = { token: credential.identityToken, apple_id: credential.user }
      const isFirstTime = !!credential.fullName.givenName && !!credential.email
      if (isFirstTime) {
        await storeSecureData('appleUserName', credential.fullName)
        loginCredentials = {
          ...loginCredentials,
          first_name: credential.fullName.givenName,
          last_name: credential.fullName.familyName,
        }
      } else {
        const appleUserName = await getSecureData('appleUserName')
        if (appleUserName) {
          loginCredentials = {
            ...loginCredentials,
            first_name: appleUserName.givenName,
            last_name: appleUserName.familyName,
          }
        }
      }

      const response = await loginApple(loginCredentials).unwrap()
      if (!response.completed) {
        let userFullName = credential.fullName
        if (!isFirstTime) userFullName = await getSecureData('appleUserName')
        return navigate('CompleteApple', { appleUserName: userFullName })
      }
      await removeSecureData('appleUserName')
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
