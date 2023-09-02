import { View } from 'react-native'
import React from 'react'

import Container from '../../components/utils/Container'
import StepsBar from '../../components/utils/StepsBar'
import { exchangeSteps } from '../../utils/exchange-steps'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import Text from '@/components/utils/Text'

export default function CompleteScreen({ navigation, control }) {
  return (
    <Container>
      <StepsBar steps={exchangeSteps} />
      <Text variant="titleLarge" className="text-center mb-1 mt-10">
        Coloca tu no. de operación
      </Text>
      <Text className="text-center">Coloca el número de operación mostrado en el coomprobante que genera tu banco </Text>
      <View className="mt-10" />
      <Input label="Coloca tu no. de operación" control={control} name="transactionCode" />
      <View className="mt-2" />
      <View className="mt-auto" />
      <Button onPress={() => navigation.navigate('Success')}>Completar solicitud</Button>
      <View className="mt-4" />
      <Button variant="secondary" onPress={() => navigation.goBack()}>
        Regresar
      </Button>
      <View className="mb-4" />
    </Container>
  )
}
