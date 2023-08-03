import React from 'react'
import { View } from 'react-native'

export default function Container({ children, classes }) {
  return <View className={`p-6 w-full flex-1 h-full ${classes}`}>{children}</View>
}
