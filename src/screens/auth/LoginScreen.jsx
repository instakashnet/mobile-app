import { Pressable, ScrollView, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

import Icon from '../../../assets/images/svgs/Icon'
import LoginForm from '../../components/auth/LoginForm'
import Link from '../../components/utils/Link'
import KeyboardView from '../../components/utils/KeyboardView'
import GoogleLogin from '../../components/auth/GoogleLogin'
import AppleLogin from '../../components/auth/AppleLogin'

export default function LoginScreen({ navigation }) {
  return (
    <KeyboardView>
      <ScrollView keyboardDismissMode="on-drag">
        <View className="flex-1 items-center justify-center p-6">
          <Icon width={75} />
          <View>
            <Text className="mt-4" variant="titleLarge">
              Bienvenido a Instakash
            </Text>
          </View>
          <LoginForm />
          <View className="w-full items-start mt-3">
            <Pressable onPress={() => navigation.navigate('RecoverPassword')}>
              <Link>Olvidé mi contraseña</Link>
            </Pressable>
          </View>
          <View className="mt-10" />
          <GoogleLogin />

          <View className="mt-4" />
          <AppleLogin />

          <Pressable className="mt-4 items-center" onPress={() => navigation.navigate('Register')}>
            <Text>
              ¿Aún no tienes una cuenta? <Link>Regístrate</Link>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardView>
  )
}
