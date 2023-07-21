import React from 'react'
import { Pressable } from 'react-native'
import { Text } from 'react-native-paper'

import RegisterForm from '../../components/auth/RegisterForm'
import Link from '../../components/utils/Link'
import Screen from '../../components/utils/Screen'

export default function RegisterScreen({ navigation }) {
  return (
    <Screen>
      <Text variant="titleLarge">Crea tu cuenta</Text>
      <Text className="mt-2">Comienza a cambiar creando tu cuenta. Es simple y rápido</Text>
      <RegisterForm />
      <Pressable className="self-center mt-6" onPress={() => navigation.push('Login')}>
        <Text>
          ¿Ya tienes una cuenta? <Link>Ingresa aquí</Link>.
        </Text>
      </Pressable>
    </Screen>
  )
}
