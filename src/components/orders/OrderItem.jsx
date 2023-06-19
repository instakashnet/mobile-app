import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import DateItem from '../UI/DateItem'
import StatusBadge from '../UI/StatusBadge'
import { Text } from 'react-native-paper'

export default function OrderItem({ order, last, onSelect }) {
  return (
    <TouchableOpacity
      activeOpacity={!onSelect ? 1 : 0.7}
      className={`flex-row py-4 items-center ${!last && 'border-b-[1px]'} border-gray-200`}
      onPress={onSelect || null}
    >
      <DateItem date={order.dateString} />
      <View className='ml-3'>
        <Text variant='button'>{order.amountToReceive}</Text>
        <Text variant='caption' className='text-gray-500'>
          {order.type} a {order.rate}
        </Text>
      </View>
      <View className='ml-auto' />
      <StatusBadge status={order.status} />
    </TouchableOpacity>
  )
}
