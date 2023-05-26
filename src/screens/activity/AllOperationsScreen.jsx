import { View, Text } from 'react-native'
import React from 'react'
import { useOrders } from '../../hooks/useOrders'

export default function AllOperationsScreen() {
  const { orders, isLoading } = useOrders(1000)

  console.log(orders)

  return (
    <View className='flex-1 items-center juustfy-center'>
      <Text>AllOperationsScreen</Text>
    </View>
  )
}
