import React, { useCallback, useState } from 'react'
import { Pressable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Text, Checkbox } from 'react-native-paper'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'

import Input from '../UI/Input'
import Button from '../UI/Button'
import { loginValidationSchema } from '../../schemas/auth'
import Helper from '../UI/Helper'
import { storeData } from '../../lib/AsyncStorage'
import { useLazyGetSessionQuery, useLoginMutation } from '../../services/auth'
import { setCredentials, setToken } from '../../store/slices/authSlice'
import PasswordInput from '../UI/PasswordInput'

export default function LoginForm() {
  const navigation = useNavigation()
  const [remember, setRemember] = useState(false)
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const [getSession] = useLazyGetSessionQuery()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
    resolver: yupResolver(loginValidationSchema),
  })

  const onSubmit = useCallback(
    async values => {
      try {
        const response = await login(values).unwrap()
        if (remember) await storeData('userEmail', { email: values.email })

        if (!response.verified) return navigation.navigate('VerifyCode')
        if (!response.completed) return navigation.navigate('Complete')
        await getSession().unwrap()
      } catch (error) {
        console.error(error)
      }
    },
    [remember],
  )

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
      <Pressable className="flex-row items-center top-[-6px]" onPress={() => setRemember(prev => !prev)}>
        <Checkbox.Android status={remember ? 'checked' : 'unchecked'} color="#0d8284" />
        <Text className="flex-wrap flex-1">Recordarme</Text>
      </Pressable>
      <View className="mt-4" />
      <Button onPress={handleSubmit(onSubmit)} disabled={!isValid} loading={isLoading}>
        Ingresar
      </Button>
    </View>
  )
}
