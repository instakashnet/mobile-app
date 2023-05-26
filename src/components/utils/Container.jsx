import { View } from 'react-native'
import React from 'react'

export default function Container({ children, className }) {
  return <View className={`p-6 w-full flex-1 ${className}`}>{children}</View>
}
