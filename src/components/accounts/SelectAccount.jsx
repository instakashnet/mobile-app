import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

import bankImages from '../../../data/bankImages'
import Text from '../utils/Text'

export default function SelectAccount({ accSelected, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="w-full flex-row items-center justify-between bg-white border-[1px] border-[#C2C2C2] rounded-lg p-2 px-3">
      {!accSelected ? (
        <Text className="text-gray-500">Selecciona una cuenta</Text>
      ) : (
        <View className="flex-row items-center gap-x-2 w-[70%]">
          <Image source={bankImages[accSelected?.bank.name?.toLowerCase()]?.image} resizeMode="contain" className="w-14 h-5" />
          <View>
            <Text variant="caption" numberOfLines={1}>
              {accSelected?.cci || accSelected?.accNumber}
            </Text>
            <Text className="text-gray-500" variant="caption" numberOfLines={1}>
              {accSelected?.alias} <Text className="text-gray-700">{accSelected?.isThird && '• Cuenta tercero'}</Text>
            </Text>
          </View>
        </View>
      )}
      <Ionicons name="chevron-down-outline" size={24} color="#444" />
    </TouchableOpacity>
  )
}
