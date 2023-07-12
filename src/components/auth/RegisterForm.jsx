import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'

import { registerValidationSchema } from '../../schemas/auth'
import { useRegisterMutation } from '../../services/auth'
import Button from '../UI/Button'
import Checkbox from '../UI/Checkbox'
import Helper from '../UI/Helper'
import Input from '../UI/Input'
import Link from '../utils/Link'

export default function RegisterForm() {
  const navigation = useNavigation()
  const [showPassword, setShowPassword] = useState(false)
  const [register, { isLoading }] = useRegisterMutation()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      affiliate: '',
      allowPromotionalEmail: true,
      acceptTerms: false,
    },
    mode: 'onTouched',
    resolver: yupResolver(registerValidationSchema),
  })

  const onSubmit = async values => {
    try {
      await register(values).unwrap()

      navigation.navigate('VerifyCode', { verificationType: 'OTP' })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className="mt-8 w-full">
      <Input
        label="Correo electrónico"
        name="email"
        control={control}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="username"
      />
      <Helper error={errors.email?.message} />
      <View className="mt-2" />
      <View className="w-full relative">
        <Input label="Contraseña" name="password" error={errors.password} control={control} secureTextEntry={!showPassword} />
        <IconButton
          icon={showPassword ? 'eye-off' : 'eye'}
          iconColor="#ccc"
          onPress={() => setShowPassword(prev => !prev)}
          className="absolute right-[5px] top-[-1px] z-10"
        />
      </View>
      <Helper error={errors.password?.message} helper="Debe contener al menos una mayúscula, una minúscula y un número" />
      <View className="mt-3" />
      <Text variant="titleSmall">¿Alguien te ha referido?</Text>
      <View className="mt-2" />
      <Input label="Código de referido" name="affiliate" error={errors.affiliate} control={control} />
      <View className="mt-4" />
      <Checkbox name="allowPromotionalEmail" control={control}>
        <Text variant="caption" className="flex-wrap flex-1">
          Autorizo recibir notícias y promociones de parte de Instakash.
        </Text>
      </Checkbox>
      <View className="mt-2" />
      <Checkbox name="acceptTerms" error={errors.acceptTerms} control={control}>
        <Text variant="caption" className="flex-wrap flex-1">
          Declaro que he leído y acepto tus <Link className="text-xs">Términos y condiciones</Link> y las{' '}
          <Link className="text-xs">Políticas de privacidad</Link>.
        </Text>
      </Checkbox>
      <View className="mt-8" />
      <Button onPress={handleSubmit(onSubmit)} loading={isLoading} disabled={!isValid}>
        Crea cuenta
      </Button>
    </View>
  )
}
