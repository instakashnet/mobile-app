import { View } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'

export default function DateItem({ date }) {
  const { colors } = useTheme()

  return (
    <View className='bg-[#E7F5F1] rounded-lg p-1 h-12 w-12 justify-center'>
      <Text variant='button' style={{ color: colors.primary700, lineHeight: 18, flexWrap: 'wrap', textAlign: 'center' }}>
        {date}
      </Text>
    </View>
  )
}
