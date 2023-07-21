import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Pressable, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import Button from '../../components/UI/Button'
import Helper from '../../components/UI/Helper'
import Input from '../../components/UI/Input'
import Link from '../../components/utils/Link'
import Screen from '../../components/utils/Screen'
import { resetPasswordSchema } from '../../schemas/auth'
import { useResetPasswordMutation } from '../../services/auth'
import { showAlert } from '../../store/slices/alert'
import { setLogout } from '../../store/slices/authSlice'

export default function ResetPasswordScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(resetPasswordSchema),
  })

  const onSubmit = async values => {
    try {
      await resetPassword(values).unwrap()
      dispatch(setLogout())
      Alert.alert('Contraseña cambiada', 'La contraseña fue cambiada correctamente. Ya puedes iniciar sesión con tu nueva contraseña.')
      return navigation.push('Login')
    } catch (error) {
      dispatch(showAlert({ type: 'error', message: error.message }))
    }
  }

  return (
    <Screen>
      <View className="flex-1 items-center justify-center">
        <Text variant="titleLarge">Escribe tu nueva contraseña</Text>
        <Text className="text-center mt-1">Ingresa tu nueva contraseña e inicia sesión para realizar tus cambios.</Text>

        <View className="w-full mt-10">
          <View className="w-full relative">
            <Input label="Contraseña" name="password" error={errors.password} control={control} secureTextEntry={!showPassword} />
            <IconButton
              icon={showPassword ? 'eye-off' : 'eye'}
              iconColor="#ccc"
              onPress={() => setShowPassword(prev => !prev)}
              className="absolute right-[5px] top-[-1px] z-10"
            />
          </View>
          <Helper error={errors.password?.message} />
          <View className="mt-2" />
          <View className="w-full relative">
            <Input
              label="Contraseña"
              name="confirmPassword"
              error={errors.confirmPassword}
              control={control}
              secureTextEntry={!showPassword}
            />
            <IconButton
              icon={showPassword ? 'eye-off' : 'eye'}
              iconColor="#ccc"
              onPress={() => setShowPassword(prev => !prev)}
              className="absolute right-[5px] top-[-1px] z-10"
            />
          </View>
          <Helper error={errors.confirmPassword?.message} />
          <View className="mt-6" />
          <Button onPress={!isValid ? null : handleSubmit(onSubmit)} disabled={!isValid} loading={isLoading}>
            Continuar
          </Button>
          <View className="mt-4" />
          <Button variant="secondary" disabled={isLoading} onPress={() => navigation.popToTop()}>
            Volver al inicio
          </Button>
        </View>
        <Pressable className="items-center mt-auto" onPress={() => navigation.push('Login')}>
          <Text>
            ¿Has recordado tu contraseña? <Link>Inicia sesión</Link>
          </Text>
        </Pressable>
      </View>
    </Screen>
  )
}
