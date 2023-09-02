import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, View } from 'react-native'
import { useDispatch } from 'react-redux'

import Button from '../../components/UI/Button'
import Helper from '../../components/UI/Helper'
import Input from '../../components/UI/Input'
import Link from '../../components/utils/Link'
import Screen from '../../components/utils/Screen'
import { recoverPasswordSchema } from '../../schemas/auth'
import { useRecoverPasswordMutation } from '../../services/auth'
import { showAlert } from '../../store/slices/alert'
import { setToken } from '../../store/slices/authSlice'
import Text from '@/components/utils/Text'

export default function RecoverPasswordScreen({ navigation }) {
  const dispatch = useDispatch()
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(recoverPasswordSchema),
  })

  const onSubmit = async values => {
    try {
      const response = await recoverPassword(values).unwrap()
      dispatch(setToken(response.accessToken))

      navigation.navigate('VerifyCode', { verificationType: 'PWD' })
    } catch (error) {
      dispatch(showAlert({ type: 'error', message: error.message }))
    }
  }

  return (
    <Screen>
      <View className="flex-1 items-center justify-center">
        <Text variant="titleLarge">¿Olvidaste tu contraseña?</Text>
        <Text className="text-center mt-1">
          Nosotros te ayudamos. Ingresa tu correo y te enviaremos un código para verificar y generar una nueva.
        </Text>
        <View className="w-full mt-10 ">
          <Input
            control={control}
            error={errors.email}
            name="email"
            label="Ingresa tu correo"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <Helper error={errors.email?.message} />
          <View className="mt-6" />
          <Button onPress={handleSubmit(onSubmit)} loading={isLoading} disabled={!isValid}>
            Continuar
          </Button>
        </View>
        <Pressable className="items-center mt-auto" onPress={() => navigation.goBack()}>
          <Text>
            ¿Aún no tienes una cuenta? <Link>Regístrate</Link>
          </Text>
        </Pressable>
      </View>
    </Screen>
  )
}
