import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'

import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import Link from '../../components/utils/Link'
import Screen from '../../components/utils/Screen'
import { verifyCodeValidationSchema } from '../../schemas/auth'
import { useLazyResendCodeQuery, useVerifyCodeMutation } from '../../services/auth'
import { showAlert } from '../../store/slices/alert'
import Text from '@/components/utils/Text'

export default function VerifyCodeScreen({ navigation, route }) {
  const dispatch = useDispatch()
  const params = route.params
  const [verifyCode, { isLoading }] = useVerifyCodeMutation()
  const [codeSent, setCodeSent] = useState(false)
  const [resendCode, { isLoading: isResending }] = useLazyResendCodeQuery()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      verificationCode: '',
      operation: params?.verificationType,
    },
    resolver: yupResolver(verifyCodeValidationSchema),
  })

  const onSubmit = async values => {
    try {
      await verifyCode(values).unwrap()

      if (values.operation === 'PWD') {
        return navigation.navigate('ResetPassword')
      } else {
        return navigation.navigate('Complete')
      }
    } catch (error) {
      dispatch(showAlert({ type: 'error', message: error.message }))
    }
  }

  const handleResendCode = async () => {
    try {
      await resendCode().unwrap()
      setCodeSent(true)
      Toast.show({
        type: 'success',
        text2: 'El código fue reenvíado correctamente. Recuerda revisar la carpeta spam.',
      })

      setTimeout(() => {
        setCodeSent(false)
      }, 60000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Screen>
      <View className="flex-1 justify-center">
        <Text variant="titleLarge">Verifica tu cuenta</Text>
        <Text className="mt-2">Te hemos enviado un correo con un código de 4 digitos para validar tu cuenta.</Text>
        <View className="mt-10">
          <Input
            label="Ingresa tu código"
            control={control}
            name="verificationCode"
            error={errors.verificationCode?.message}
            keyboardType="number-pad"
            maxLength={4}
          />
        </View>
        <View className="flex-row items-center justify-between mt-3">
          <Pressable onPress={handleResendCode} disabled={isResending || codeSent}>
            <Link className={codeSent ? 'text-gray-400' : ''}>Reenvia código</Link>
          </Pressable>
        </View>
        <Button className="mt-10" loading={isLoading} onPress={handleSubmit(onSubmit)} disabled={!isValid}>
          Confirmar cuenta
        </Button>
        <Button variant="secondary" className="border-gray-200 border-2 mt-4" onPress={() => navigation.popToTop()}>
          Volver al inicio
        </Button>
      </View>
    </Screen>
  )
}
