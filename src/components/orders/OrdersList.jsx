import { FlatList } from 'react-native'
import React from 'react'
import OrderItem from './OrderItem'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function OrdersList({ data = [], listProps = {} }) {
  const navigation = useNavigation()

  return data.length > 0 ? (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id?.toString()}
      renderItem={({ item }) => <OrderItem order={item} onSelect={() => navigation.navigate('OrderDetails', { order: item })} />}
      {...listProps}
    />
  ) : (
    <Text className='p-4 text-center'>Aun no tienes cambios registrados</Text>
  )
}
