import React, { useMemo, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'

import EmailVoucherInfo from '../../components/transfer/EmailVoucherInfo'
import TransferCode from '../../components/transfer/TransferCode'
import TransferInfo from '../../components/transfer/TransferInfo'
import Button from '../../components/UI/Button'
import Container from '../../components/utils/Container'
import StepsBar from '../../components/utils/StepsBar'
import Timer from '../../components/utils/Timer'
import { resetNavigate } from '../../helpers/nav-actions'
import { useCountdown } from '../../hooks/useCountdown'
import { useCancelExchangeMutation } from '../../services/exchange'
import { exchangeSteps } from '../../utils/exchange-steps'

export default function TransferScreen({ navigation, route }) {
  const order = route.params?.order
  const [cancelExchange, { isLoading }] = useCancelExchangeMutation()
  const [transferCompleted, setTransferCompleted] = useState(false)
  const date1 = useMemo(() => new Date(), [])
  const date2 = useMemo(() => new Date(order?.expiredAt), [order])
  const timeLeft = useMemo(() => date2.getTime() - date1.getTime(), [date1, date2])
  const { timerId, countdown, completeHandler } = useCountdown(timeLeft)

  const handleCancelExchange = async () => {
    console.log(order)

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
          onPress: () => handleCancelExchange(),
        },
      ],
    )
  }
  const handleGoBack = () => setTransferCompleted(false)
  const handleComplete = () => navigation.navigate('TransferSuccess')

  return (
    <ScrollView>
      <Container>
        <StepsBar steps={exchangeSteps} />
        <View className="mt-8" />
        {!transferCompleted ? (
          <TransferInfo order={order} />
        ) : !order?.bankFromClientActive ? (
          <EmailVoucherInfo order={order} onPressBack={handleGoBack} onComplete={handleComplete} />
        ) : (
          <TransferCode order={order} onPressBack={handleGoBack} onComplete={handleComplete} />
        )}
        <View className="mt-2" />
        <View className="flex-row items-center justify-between px-2">
          <Text variant="caption">Tiempo para completar:</Text>
          <Timer timerId={timerId} countdown={countdown} completeHandler={() => completeHandler(handleTimeout)} />
        </View>
        <View className="mt-10" />
        {!transferCompleted ? (
          <>
            <Text className="text-center mb-1" variant="button">
              Ya realizaste la transferencia?
            </Text>
            <Button onPress={() => setTransferCompleted(true)} disabled={isLoading}>
              Si, continuar
            </Button>
            <View className="mb-4" />
            <Button variant="secondary" loading={isLoading} onPress={handleCancelExchange}>
              Cancelar
            </Button>
          </>
        ) : null}

        <View className="mt-4" />
      </Container>
    </ScrollView>
  )
}
