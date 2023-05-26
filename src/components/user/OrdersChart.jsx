import { View } from 'react-native'
import React from 'react'
import Card from '../UI/Card'
import { Text } from 'react-native-paper'
import { PieChart } from 'react-native-chart-kit'
import { useOperationsData } from '../../hooks/useOperationsData'

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

export default function OrdersChart() {
  const { operationsData } = useOperationsData([])

  return (
    <>
      <Text variant='button' className='text-xl'>
        Cambios del mes
      </Text>
      <Text>Comparativa entre tus compras y ventas</Text>
      <View className='mx-auto items-center justify-center relative'>
        <PieChart
          data={operationsData}
          width={250}
          height={250}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 16 }}
          accessor='population'
          backgroundColor='transparent'
          paddingLeft='70'
          absolute
          hasLegend={false}
        />
        <View className='w-[130px] h-[130px] bg-white rounded-full absolute left-[67px] top-[67px] items-center justify-center'>
          <Text variant='titleLarge' className='text-5xl leading-[55px]'>
            0
          </Text>
          <Text className='text-center mt-[-10px]'>Cambios en el mes</Text>
        </View>
      </View>
      <View className='flex-row items-center justify-between'>
        <View className='mx-6'>
          <Text variant='button'>Compra</Text>
          <Text>$500.00</Text>
        </View>
        <View className='mx-6'>
          <Text variant='button'>Venta</Text>
          <Text>$1500.00</Text>
        </View>
      </View>
    </>
  )
}
