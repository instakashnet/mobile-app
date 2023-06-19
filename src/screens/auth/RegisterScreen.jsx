import { Pressable, ScrollView } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import RegisterForm from '../../components/auth/RegisterForm'
import Link from '../../components/utils/Link'
import KeyboardView from '../../components/utils/KeyboardView'
import DismissKeyboard from '../../components/utils/DismissKeyboard'
import Container from '../../components/utils/Container'

export default function RegisterScreen({ navigation }) {
  return (
    <KeyboardView>
      <ScrollView keyboardDismissMode='on-drag'>
        <Container>
          <Text variant='titleLarge'>Crea tu cuenta</Text>
          <Text className='mt-2'>Comienza a cambiar creando tu cuenta. Es simple y rápido</Text>
          <RegisterForm />
          <Pressable className='self-center mt-10' onPress={() => navigation.push('Login')}>
            <Text>
              ¿Ya tienes una cuenta? <Link>Ingresa aquí</Link>.
            </Text>
          </Pressable>
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}
