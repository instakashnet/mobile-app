import { View } from 'react-native'
import React from 'react'

export default function Card({ children, classes = [] }) {
  return <View className={`p-4 bg-white rounded-lg border-[1px] border-[#F0F0F0] w-full ${classes.join(' ')}`}>{children}</View>
}
