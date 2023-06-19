import { View } from 'react-native'
import React from 'react'
import Card from '../UI/Card'
import { Text } from 'react-native-paper'
import { PieChart } from 'react-native-chart-kit'
import { useOperationsData } from '../../hooks/useOperationsData'
import { formatAmount } from '../../helpers/formatters'

const chartConfig = {
  backgroundColor: '#194ad1',
  backgroundGradientFrom: '#f74871',
  backgroundGradientTo: '#ffbc47',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16
  }
}

export default function OrdersChart({ data = {} }) {
  const { operationsData } = useOperationsData(data)

  return (
    <Card classes={['items-center', 'justify-center']}>
      <Text variant='button' className='text-xl'>
        Cambios del mes
      </Text>
      <Text>Comparativa entre tus compras y ventas</Text>
      <View className='mx-auto items-center justify-center relative min-w-[130px] min-h-[130px]'>
        <PieChart
          data={operationsData}
          width={200}
          height={200}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 16 }}
          accessor='population'
          backgroundColor='transparent'
          paddingLeft='70'
          absolute
          hasLegend={false}
        />
        <View className='bg-white rounded-full absolute items-center justify-center'>
          <Text variant='titleLarge' className='text-5xl leading-[55px]'>
            0
          </Text>
          <Text className='text-center mt-[-10px]'>Cambios en el mes</Text>
        </View>
      </View>
      <View className='flex-row items-center justify-between'>
        <View className='mx-6'>
          <Text variant='button'>Compra</Text>
          <Text>{formatAmount(data.buy?.amount, '$')}</Text>
        </View>
        <View className='mx-6'>
          <Text variant='button'>Venta</Text>
          <Text>{formatAmount(data.sell?.amount, '$')}</Text>
        </View>
      </View>
    </Card>
  )
}
