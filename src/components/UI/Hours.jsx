import { View } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import { hoursMessages } from '../../../data/hours'

export default function Hours() {
  const { colors } = useTheme()

  return (
    <View className='px-4 py-3 rounded-lg' style={{ backgroundColor: colors.primary50 }}>
      <Text style={{ color: colors.primary700 }}>{hoursMessages.monday}</Text>
    </View>
  )
}
