import React from 'react'
import SafeArea from '../../components/utils/SafeArea'
import { Pressable, View } from 'react-native'
import { Text } from 'react-native-paper'
import Input from '../../components/UI/Input'
import { useForm } from 'react-hook-form'
import Button from '../../components/UI/Button'
import Link from '../../components/utils/Link'
import Helper from '../../components/UI/Helper'
import { yupResolver } from '@hookform/resolvers/yup'
import { recoverPasswordSchema } from '../../schemas/auth'
import DismissKeyboard from '../../components/utils/DismissKeyboard'
import { useDispatch } from 'react-redux'
import { useRecoverPasswordMutation } from '../../services/auth'
import { showAlert } from '../../store/slices/alert'
import KeyboardView from '../../components/utils/KeyboardView'
import { setToken } from '../../store/slices/authSlice'

export default function RecoverPasswordScreen({ navigation }) {
  const dispatch = useDispatch()
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()
  const {
    control,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm({
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(recoverPasswordSchema)
  })

  const onSubmit = async (values) => {
    try {
      const response = await recoverPassword(values).unwrap()
      dispatch(setToken(response.accessToken))

      navigation.navigate('VerifyCode', { verificationType: 'PWD' })
    } catch (error) {
      dispatch(showAlert({ type: 'error', message: error.message }))
    }
  }

  return (
    <KeyboardView>
      <DismissKeyboard>
        <View className='flex-1 items-center justify-center p-6 mt-6'>
          <Text variant='titleLarge'>¿Olvidaste tu contraseña?</Text>
          <Text className='text-center mt-1'>
            Nosotros te ayudamos. Ingresa tu correo y te enviaremos un código para verificar y generar una nueva.
          </Text>
          <DismissKeyboard>
            <View className='w-full mt-10 mb-auto'>
              <Input
                control={control}
                error={errors.email}
                name='email'
                label='Ingresa tu correo'
                keyboardType='email-address'
                autoCapitalize='none'
                autoComplete='email'
              />
              <Helper error={errors.email?.message} />
              <View className='mt-6' />
              <Button onPress={handleSubmit(onSubmit)} loading={isLoading} disabled={!isValid}>
                Continuar
              </Button>
            </View>
          </DismissKeyboard>
          <Pressable className='items-center' onPress={() => navigation.goBack()}>
            <Text>
              ¿Aún no tienes una cuenta? <Link>Regístrate</Link>
            </Text>
          </Pressable>
        </View>
      </DismissKeyboard>
    </KeyboardView>
  )
}
