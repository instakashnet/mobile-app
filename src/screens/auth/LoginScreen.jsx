import React, { useEffect } from 'react'
import { Pressable, View } from 'react-native'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'

import Icon from '../../../assets/images/svgs/Icon'
import AppleLogin from '../../components/auth/AppleLogin/AppleButton'
import GoogleLoginButton from '../../components/auth/GoogleLogin/GoogleButton'
import LoginForm from '../../components/auth/Login/LoginForm'
import Link from '../../components/utils/Link'
import Screen from '../../components/utils/Screen'
import Text from '@/components/utils/Text'

export default function LoginScreen({ navigation }) {
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: '714696989879-rkuapcucjc4u0ttfk7kd92k45k1b11js.apps.googleusercontent.com',
  //   })
  // }, [])

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices()
  //     const userInfo = await GoogleSignin.signIn()
  //     console.log(userInfo)
  //   } catch (error) {
  //     console.log('google error: ', error)
  //   }
  // }

  return (
    <Screen>
      <View className="items-center">
        <Icon width={75} />
        <Text className="mt-4" variant="titleLarge">
          Tu casa de cambio digital
        </Text>
      </View>
      <LoginForm />
      <View className="w-full items-start mt-3">
        <Pressable onPress={() => navigation.navigate('RecoverPassword')}>
          <Link>Olvidé mi contraseña</Link>
        </Pressable>
      </View>
      <View className="flex-1 mt-6">
        {/* <GoogleSigninButton size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Light} onPress={signIn} /> */}
        <GoogleLoginButton />
        <View className="mt-4" />
        <AppleLogin />

        <View className="items-center flex-row justify-center gap-2 mt-auto">
          <Text>¿Aún no tiene una cuenta?</Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Link>Regístrate</Link>
          </Pressable>
        </View>
      </View>
    </Screen>
  )
}
