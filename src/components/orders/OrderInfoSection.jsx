import { View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

export default function OrderInfoSection({ title, children }) {
  return (
    <View className="flex-row items-center justify-between">
      {typeof title === 'string' ? <Text variant="button">{title}</Text> : title}
      {children}
    </View>
  )
}
