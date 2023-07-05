import { View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

import IconWhite from '../../assets/images/svgs/IconWhite'

export default function LoadingScreen() {
  const { colors } = useTheme()

  return (
    <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.primary700 }}>
      <IconWhite width={150} />
    </View>
  )
}
