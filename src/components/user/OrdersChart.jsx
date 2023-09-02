import { View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

import Card from '../UI/Card'
import { useOperationsData } from '../../hooks/useOperationsData'
import { formatAmount } from '../../helpers/formatters'

const chartConfig = {
  backgroundColor: '#194ad1',
  backgroundGradientFrom: '#f74871',
  backgroundGradientTo: '#ffbc47',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
}

export default function OrdersChart({ data = {} }) {
  const { operationsData } = useOperationsData(data)

  return (
    <Card classes={['items-center', 'justify-center']}>
      <Text variant="button" className="text-xl">
        Cambios del mes
      </Text>
      <Text>Comparativa entre tus compras y ventas</Text>
      <View className="items-center justify-center">
        <View className="bg-white rounded-full my-10 items-center justify-center">
          <Text variant="titleLarge" className="text-5xl leading-[55px]">
            0
          </Text>
          <Text className="text-center mt-[-10px]">Cambios en el mes</Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <View className="mx-6">
          <Text variant="button">Compra</Text>
          <Text>{formatAmount(data.buy?.amount, '$')}</Text>
        </View>
        <View className="mx-6">
          <Text variant="button">Venta</Text>
          <Text>{formatAmount(data.sell?.amount, '$')}</Text>
        </View>
      </View>
    </Card>
  )
}
