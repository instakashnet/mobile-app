import { ScrollView, View, Alert } from 'react-native'
import React, { useMemo, useState } from 'react'
import Container from '../../components/utils/Container'
import { Text } from 'react-native-paper'
import TransferAmountsInfo from '../../components/transfer/TransferAmountsInfo'
import StepsBar from '../../components/utils/StepsBar'
import { exchangeSteps } from '../../utils/exchange-steps'
import Card from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import AccountInfo from '../../components/transfer/AccountInfo'
import Timer from '../../components/utils/Timer'
import { useCancelExchangeMutation } from '../../services/exchange'
import { useCountdown } from '../../hooks/useCountdown'
import TransferInfo from '../../components/transfer/TransferInfo'
import TransferCode from '../../components/transfer/TransferCode'
import { resetNavigate } from '../../helpers/nav-actions'

export default function TransferScreen({ navigation, route }) {
  const order = route.params?.order
  const [cancelExchange, { isLoading }] = useCancelExchangeMutation()
  const [transferCompleted, setTransferCompleted] = useState(false)
  const date1 = new Date(order?.created)
  const date2 = new Date(order?.expiredAt)
  const timeLeft = useMemo(() => date2.getTime() - date1.getTime(), [date1, date2])
  const { timerId, countdown, completeHandler } = useCountdown(timeLeft)

  const handleCancelExchange = async () => {
    try {
      await cancelExchange({ orderId: order?.id, cancelType: 'order' }).unwrap()
      resetNavigate(navigation, 'Calculator')
    } catch (error) {
      console.log(error)
    }
  }
  const handleTimeout = () => {
    Alert.alert(
      'Tiempo de transferencia expirado',
      'Tu tiempo para realizar la transferencia ha expirado. Deberás crear un nuevo pedido si deseas hacer tu cambio.',
      [
        {
          text: 'Aceptar',
          onPress: () => handleCancelExchange()
        }
      ]
    )
  }

  return (
    <ScrollView>
      <Container>
        <StepsBar steps={exchangeSteps} />
        <View className='mt-8' />
        {!transferCompleted ? (
          <TransferInfo order={order} />
        ) : (
          <TransferCode order={order} onPressBack={() => setTransferCompleted(false)} navigate={navigation.navigate} />
        )}
        <View className='mt-2' />
        <View className='flex-row items-center justify-between px-2'>
          <Text variant='caption'>Tiempo para completar:</Text>
          <Timer timerId={timerId} countdown={countdown} completeHandler={() => completeHandler(handleTimeout)} />
        </View>
        <View className='mt-10' />
        {!transferCompleted ? (
          <>
            <Text className='text-center mb-1' variant='button'>
              Ya realizaste la transferencia?
            </Text>
            <Button onPress={() => setTransferCompleted(true)} disabled={isLoading}>
              Si, continuar
            </Button>
            <View className='mb-4' />
            <Button variant='secondary' loading={isLoading} onPress={handleCancelExchange}>
              Cancelar
            </Button>
          </>
        ) : null}

        <View className='mt-4' />
      </Container>
    </ScrollView>
  )
}
