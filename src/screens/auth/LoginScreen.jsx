import { Pressable, View } from 'react-native'
import React from 'react'
import Icon from '../../../assets/images/svgs/Icon'
import { Text } from 'react-native-paper'
import LoginForm from '../../components/auth/LoginForm'
import Link from '../../components/utils/Link'
import GoogleIcon from '../../../assets/images/svgs/GoogleIcon'
import AppleIcon from '../../../assets/images/svgs/AppleIcon'
import Button from '../../components/UI/Button'
import KeyboardView from '../../components/utils/KeyboardView'
import DismissKeyboard from '../../components/utils/DismissKeyboard'

export default function LoginScreen({ navigation }) {
  return (
    <KeyboardView>
      <DismissKeyboard>
        <View className='flex-1 items-center  p-6'>
          <Icon width={75} />
          <View>
            <Text className='mt-4' variant='titleLarge'>
              Bienvenido a Instakash
            </Text>
          </View>
          <LoginForm />
          <View className='w-full items-start mt-3'>
            <Pressable onPress={() => navigation.navigate('RecoverPassword')}>
              <Link>Olvidé mi contraseña</Link>
            </Pressable>
          </View>
          <View className='w-full mt-10'>
            <Button variant='secondary' onPress={() => console.log('logging google..')} icon={() => <GoogleIcon width={20} />}>
              <Text variant='button' style={{ color: '#525252' }}>
                Ingresar con google
              </Text>
            </Button>
          </View>

          <View className='w-full mt-4'>
            <Button variant='secondary' onPress={() => console.log('logging apple..')} icon={() => <AppleIcon width={20} />}>
              <Text variant='button' style={{ color: '#525252' }}>
                Ingresar con apple
              </Text>
            </Button>
          </View>

          <Pressable className='mt-auto items-center' onPress={() => navigation.navigate('Register')}>
            <Text>
              ¿Aún no tienes una cuenta? <Link>Regístrate</Link>
            </Text>
          </Pressable>
        </View>
      </DismissKeyboard>
    </KeyboardView>
  )
}
