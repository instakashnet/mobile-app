import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

import { transactionCodeSchema } from '../../schemas/exchange'
import { useCompleteExchangeMutation } from '../../services/exchange'
import Button from '../UI/Button'
import Helper from '../UI/Helper'
import Input from '../UI/Input'
import Text from '../utils/Text'

export default function TransferCode({ onPressBack, order, onComplete }) {
  const [completeExchange, { isLoading }] = useCompleteExchangeMutation()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      transaction_code: '',
    },
    resolver: yupResolver(transactionCodeSchema),
  })

  const onSubmit = async values => {
    try {
      await completeExchange({ orderId: order?.id, values }).unwrap()
      onComplete()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className="flex-1 h-full">
      <Text variant="titleLarge" className="text-center mb-1">
        Coloca tu no. de operación
      </Text>
      <Text className="text-center">Coloca el número de operación mostrado en el coomprobante que genera tu banco </Text>
      <View className="mt-8" />
      <Input label="Coloca tu no. de operación" control={control} name="transaction_code" error={errors.transaction_code} maxLength={14} />
      <Helper error={errors.transaction_code?.message} />
      <View className="mt-14" />
      <Button onPress={handleSubmit(onSubmit)} loading={isLoading} disabled={!isValid}>
        Completar solicitud
      </Button>
      <View className="mt-4" />
      <Button variant="secondary" onPress={onPressBack}>
        Regresar
      </Button>
    </View>
  )
}
