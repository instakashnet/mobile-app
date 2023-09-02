import React from 'react'
import { Pressable, View } from 'react-native'

import Icon from '../../../assets/images/svgs/Icon'
import AppleLogin from '../../components/auth/AppleLogin/AppleButton'
import GoogleLogin from '../../components/auth/GoogleLogin/GoogleButton'
import LoginForm from '../../components/auth/Login/LoginForm'
import Link from '../../components/utils/Link'
import Screen from '../../components/utils/Screen'
import Text from '@/components/utils/Text'

export default function LoginScreen({ navigation }) {
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
        <GoogleLogin />
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
