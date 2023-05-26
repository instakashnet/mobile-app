import { FlatList, View } from 'react-native'
import React from 'react'
import OrderItem from './OrderItem'
import { Text } from 'react-native-paper'
import { useOrders } from '../../hooks/useOrders'

export default function OrdersList({ limit = 0 }) {
  const { orders } = useOrders(limit)

  return orders.length > 0 ? (
    <FlatList
      contentContainerStyle={{ width: '100%', height: 200 }}
      data={orders}
      keyExtractor={(item) => item.id?.toString()}
      renderItem={({ item }) => <OrderItem order={item} />}
    />
  ) : (
    <Text className='p-4 text-center'>Aun no tienes cambios registrados</Text>
  )
}
