import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

export default function MenuItem({ label, description, onNavigate }) {
  return (
    <TouchableOpacity className='flex-row items-center py-4 justify-between' onPress={onNavigate}>
      <View className='w-[82%]'>
        <Text variant='titleSmall'>{label}</Text>
        {description && <Text variant='caption'>{description}</Text>}
      </View>
      <Ionicons name='chevron-forward-outline' size={24} color='#777' />
    </TouchableOpacity>
  )
}
