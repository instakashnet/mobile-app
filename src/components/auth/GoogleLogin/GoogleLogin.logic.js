import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useNavigation } from '@react-navigation/core'
import * as Sentry from 'sentry-expo'
import { useEffect } from 'react'
import { Platform } from 'react-native'

import ENV from '../../../../variables'
import { useLazyGetSessionQuery, useLoginGoogleMutation } from '../../../services/auth'

export function useGoogleLogin() {
  const [loginGoogle, { isLoading }] = useLoginGoogleMutation()
  const [getSession] = useLazyGetSessionQuery()
  const { navigate } = useNavigation()

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: ENV.googleWebClientId,
      forceCodeForRefreshToken: true,
      offlineAccess: true,
    })
  }, [])

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const googleResponse = await GoogleSignin.signIn()

      const response = await loginGoogle({ code: googleResponse.serverAuthCode, origin: Platform.OS }).unwrap()
      if (!response.completed) return navigate('Complete')
      await getSession().unwrap()
    } catch (error) {
      console.log(error)
      Sentry.Native.captureException('Error en google:', error)
    }
  }

  return {
    handleGoogleLogin,
    isLoading,
  }
}
