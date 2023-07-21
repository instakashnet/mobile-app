import React from 'react'
import { Pressable, View } from 'react-native'
import { Checkbox, Text } from 'react-native-paper'

import Button from '../../UI/Button'
import Helper from '../../UI/Helper'
import Input from '../../UI/Input'
import PasswordInput from '../../UI/PasswordInput'
import { useLogin } from './Login.logic'

export default function LoginForm() {
  const {
    control,
    formState: { errors, isValid },
    toggleRemember,
    onSubmit,
    isLoading,
    rememberEmail,
  } = useLogin()

  return (
    <View className="mt-6 w-full">
      <Input
        name="email"
        control={control}
        label="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="username"
        error={errors.email}
      />
      <Helper error={errors.email?.message} />
      <PasswordInput control={control} name="password" label="contaseña" error={errors.password} />
      <Helper error={errors.password?.message} />
      <Pressable className="flex-row items-center top-[-6px]" onPress={toggleRemember}>
        <Checkbox.Android status={rememberEmail} color="#0d8284" />
        <Text className="flex-wrap flex-1">Recordarme</Text>
      </Pressable>
      <View className="mt-4" />
      <Button onPress={onSubmit} disabled={!isValid} loading={isLoading}>
        Ingresar
      </Button>
    </View>
  )
}
