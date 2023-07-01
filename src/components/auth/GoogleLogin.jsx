import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'

import { useLazyGetSessionQuery, useLoginGoogleMutation } from '../../services/auth.js'
import GoogleIcon from '../../../assets/images/svgs/GoogleIcon'
import Button from '../UI/Button'

GoogleSignin.configure({
  webClientId: Constants.expoConfig.extra.googleWebClientId,
})

export default function GoogleLogin() {
  const [loginGoogle, { isLoading }] = useLoginGoogleMutation()
  const [getSession] = useLazyGetSessionQuery()
  const navigation = useNavigation()

  const onSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log({ userInfo })
      const response = await loginGoogle({ token: userInfo.idToken, origin: 'web' }).unwrap()

      if (!response.completed) navigation.navigate('Complete')
      await getSession().unwrap()
    } catch (error) {
      console.log(error)

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  return (
    <Button variant="secondary" loading={isLoading} className="w-full" onPress={onSignIn} icon={() => <GoogleIcon width={20} />}>
      <Text variant="button" style={{ color: '#525252' }}>
        Ingresar con google
      </Text>
    </Button>
  )
}
