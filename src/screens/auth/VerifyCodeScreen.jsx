import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import DismissKeyboard from '../../components/utils/DismissKeyboard'
import KeyboardView from '../../components/utils/KeyboardView'
import { verifyCodeValidationSchema } from '../../schemas/auth'
import { useVerifyCodeMutation } from '../../services/auth'
import { showAlert } from '../../store/slices/alert'
import { setToken } from '../../store/slices/authSlice'

export default function VerifyCodeScreen({ navigation, route }) {
  const dispatch = useDispatch()
  const params = route.params
  const [verifyCode, { isLoading }] = useVerifyCodeMutation()

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

  return (
    <KeyboardView>
      <DismissKeyboard>
        <View className="flex-1 justify-center mt-2 px-6 pb-6">
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
          <Button className="mt-10" loading={isLoading} onPress={handleSubmit(onSubmit)} disabled={!isValid}>
            Confirmar cuenta
          </Button>
          <Button variant="secondary" className="border-gray-200 border-2 mt-4" onPress={() => navigation.popToTop()}>
            Volver al inicio
          </Button>
        </View>
      </DismissKeyboard>
    </KeyboardView>
  )
}
