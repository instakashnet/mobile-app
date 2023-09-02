import { FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import OrderItem from './OrderItem'
import Text from '../utils/Text'
// import OrderItemLoader from './ItemLoader'

export default function OrdersList({ data = [], listProps = {} }) {
  const navigation = useNavigation()

  // if (isLoading) return Array.from({ length: 5 }).map((_, i) => <OrderItemLoader key={i} />)

  return data.length > 0 ? (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={item => item.id?.toString()}
      renderItem={({ item }) => <OrderItem order={item} onSelect={() => navigation.navigate('OrderDetails', { order: item })} />}
      {...listProps}
    />
  ) : (
    <Text className="p-4 text-center">Aun no tienes cambios registrados</Text>
  )
}
