import { View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

import Text from '../utils/Text'

export default function InfoStep({ step, title, children }) {
  const { colors } = useTheme()

  return (
    <View className="flex-row items-center py-2">
      <View className="rounded-full w-12 h-12 bg-[#F0F7F8] items-center justify-center mr-3">
        <Text variant="button" style={{ color: colors.primary700 }}>
          {step}
        </Text>
      </View>
      <View className="flex-1">
        <Text variant="button">{title}</Text>
        {children}
      </View>
    </View>
  )
}
