import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useNavigation } from '@react-navigation/native'
import { Platform } from 'react-native'
import { Text } from 'react-native-paper'

import GoogleIcon from '../../../assets/images/svgs/GoogleIcon'
import ENV from '../../../variables'
import { useLazyGetSessionQuery, useLoginGoogleMutation } from '../../services/auth.js'
import Button from '../UI/Button'

GoogleSignin.configure({
  webClientId: ENV.googleWebClientId,
})

export default function GoogleLogin() {
  const [loginGoogle, { isLoading }] = useLoginGoogleMutation()
  const [getSession] = useLazyGetSessionQuery()
  const navigation = useNavigation()

  const onSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      const { idToken } = await GoogleSignin.signIn()

      if (idToken) {
        const response = await loginGoogle({ token: idToken, origin: Platform.OS }).unwrap()
        if (!response.completed) return navigation.navigate('Complete')
        await getSession().unwrap()
      } else {
        console.log('No se pudo iniciar sesión con google por falta de idToken')
      }
    } catch (error) {
      console.log(error)
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
