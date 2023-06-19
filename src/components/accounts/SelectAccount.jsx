import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import bankImages from '../../../data/bankImages'
import { Image } from 'react-native'

export default function SelectAccount({ name, accSelected, onPress }) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress.bind(null, name)}
      className='w-full flex-row items-center justify-between bg-white border-[1px] rounded-lg p-2 px-3'
      style={{ borderColor: colors.primary700 }}
    >
      {!accSelected ? (
        <Text className='text-gray-500'>Selecciona una cuenta</Text>
      ) : (
        <View className='flex-row items-center gap-x-2 w-[70%]'>
          <Image source={bankImages[accSelected?.bank.name?.toLowerCase()]?.image} resizeMode='contain' className='w-14 h-5' />
          <View>
            <Text variant='caption' numberOfLines={1}>
              {accSelected?.cci || accSelected?.accNumber}
            </Text>
            <Text className='text-gray-500' variant='caption' numberOfLines={1}>
              {accSelected?.alias}
            </Text>
          </View>
        </View>
      )}
      <Ionicons name='chevron-down-outline' size={24} color='#444' />
    </TouchableOpacity>
  )
}
