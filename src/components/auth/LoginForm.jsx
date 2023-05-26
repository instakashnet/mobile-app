import React, { useCallback, useState } from 'react'
import { Pressable, View } from 'react-native'
import Input from '../UI/Input'
import { useNavigation } from '@react-navigation/native'
import { Text, IconButton } from 'react-native-paper'
import { Checkbox } from 'react-native-paper'
import Button from '../UI/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginValidationSchema } from '../../schemas/auth'
import Helper from '../UI/Helper'
import { storeData } from '../../lib/AsyncStorage'
import { useLazyGetSessionQuery, useLoginMutation } from '../../services/auth'
import { useDispatch } from 'react-redux'
import { showAlert } from '../../store/slices/alert'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { setCredentials, setToken } from '../../store/slices/authSlice'

export default function LoginForm() {
  const navigation = useNavigation()
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const [getSession] = useLazyGetSessionQuery()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'all',
    resolver: yupResolver(loginValidationSchema)
  })

  const onSubmit = useCallback(
    async (values) => {
      try {
        const response = await login(values).unwrap()
        if (remember) await storeData('userEmail', { email: values.email })
        dispatch(setToken(response.accessToken))

        if (!response.verified) return navigation.navigate('VerifyCode')
        if (!response.completed) return navigation.navigate('Complete')

        const sessionResponse = await getSession().unwrap()

        dispatch(setCredentials({ accessToken: sessionResponse.accessToken, user: sessionResponse.user }))
      } catch (error) {
        console.error(error)
      }
    },
    [remember]
  )

  return (
    <View className='mt-6 w-full'>
      <Input
        name='email'
        control={control}
        label='Correo electrónico'
        keyboardType='email-address'
        autoCapitalize='none'
        autoComplete='username'
        error={errors.email}
      />
      <Helper error={errors.email?.message} />
      <View className='mt-2' />
      <View className='w-full relative'>
        <Input name='password' control={control} label='Contraseña' error={errors.password} secureTextEntry={!showPassword} />
        <IconButton
          icon={showPassword ? 'eye-off' : 'eye'}
          iconColor='#ccc'
          onPress={() => setShowPassword((prev) => !prev)}
          className='absolute right-[5px] top-[-1px] z-10'
        />
      </View>
      {errors.password?.message && <Helper error={errors.password?.message} />}
      <View className='mt-2' />
      <Pressable className='flex-row items-center top-[-4px]' onPress={() => setRemember((prev) => !prev)}>
        <Checkbox.Android status={remember ? 'checked' : 'unchecked'} color='#0d8284' />
        <Text className='flex-wrap flex-1'>Recordarme</Text>
      </Pressable>
      <View className='mt-4' />
      <Button onPress={!isValid ? null : handleSubmit(onSubmit)} disabled={!isValid} loading={isLoading}>
        Ingresar
      </Button>
    </View>
  )
}
