import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import DateItem from '../UI/DateItem'
import StatusBadge from '../UI/StatusBadge'
import { Text } from 'react-native-paper'

export default function OrderItem({ order, last, onSelect }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`flex-row py-4 items-center ${!last && 'border-b-[1px]'} border-gray-200`}
      onPress={onSelect}
    >
      <DateItem date={order.dateString} />
      <View className='ml-3'>
        <Text variant='button'>{order.amountToReceive}</Text>
        <Text variant='caption' style={{ color: '#777' }}>
          {order.type} a {order.rate}
        </Text>
      </View>
      <View className='ml-auto' />
      <StatusBadge status={order.status} />
    </TouchableOpacity>
  )
}
