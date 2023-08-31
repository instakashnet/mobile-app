import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useNavigation } from '@react-navigation/core'
import { Platform } from 'react-native'
import * as Sentry from 'sentry-expo'

import ENV from '../../../../variables'
import { useLazyGetSessionQuery, useLoginGoogleMutation } from '../../../services/auth'

GoogleSignin.configure({
  webClientId: ENV.googleWebClientId,
})

export function useGoogleLogin() {
  const [loginGoogle, { isLoading }] = useLoginGoogleMutation()
  const [getSession] = useLazyGetSessionQuery()
  const { navigate } = useNavigation()

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const googleResponse = await GoogleSignin.signIn()

      if (googleResponse.serverAuthCode) {
        const response = await loginGoogle({ token: googleResponse.serverAuthCode, origin: Platform.OS }).unwrap()
        if (!response.completed) return navigate('Complete')
        await getSession().unwrap()
      }
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
