import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

import Card from '../UI/Card'
import AccountInfo from './AccountInfo'
import TransferAmountsInfo from './TransferAmountsInfo'

export default function TransferInfo({ order }) {
  const currencyName = order?.currencySent === 'USD' ? 'dólares' : 'soles'

  return (
    <>
      <Text variant="titleLarge" className="text-center mb-1">
        Realiza la transferencia
      </Text>
      <Text className="text-center">Transfiere desde tu banco {order?.bankFromClientName} por internet el importe de:</Text>
      <TransferAmountsInfo
        amountToReceive={order?.amountReceived}
        currencyToSend={order?.currencySentSymbol}
        currencyToReceive={order?.currencyReceivedSymbol}
        amountToSend={order?.amountSent}
        rate={order?.rate}
      />
      <View className="mt-2" />
      <AccountInfo account={order?.accountFromRaw} bank={order?.bankFromName} currency={currencyName} />
      <View className="mt-2" />
      <Card>
        <Text className="mb-1" variant="button">
          Instakash SAC
        </Text>
        <Text>RUC - 20605285105</Text>
      </Card>
    </>
  )
}
