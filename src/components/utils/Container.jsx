import React from 'react'
import { View } from 'react-native'

export default function Container({ children, className }) {
  return <View className={`p-6 w-full flex-1 h-full ${className}`}>{children}</View>
}
