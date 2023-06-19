import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { Text } from 'react-native-paper'
import bankImages from '../../../data/bankImages'

export default function SelectAccountItem({ onSelect, account }) {
  return (
    <TouchableOpacity
      onPress={onSelect.bind(null, account)}
      activeOpacity={0.7}
      className='flex-row items-center my-1 py-2 justify-between'
    >
      <Image source={bankImages[account?.bank.name?.toLowerCase()]?.image} className='w-20 h-8' resizeMode='contain' />
      <View className='items-end'>
        <Text variant='button'>
          {account?.cci || account?.accNumber} • {account?.currency?.symbol}
        </Text>
        <Text variant='caption'>{account?.alias}</Text>
      </View>
    </TouchableOpacity>
  )
}
