import * as Clipboard from 'expo-clipboard'
import React, { useCallback } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

export default function CopyButton({ textToCopy, icon: Icon = null }) {
  const { colors } = useTheme()

  const handleCopy = useCallback(async () => {
    try {
      await Clipboard.setStringAsync(textToCopy)
    } catch (error) {
      console.log('copy text error', error)
    }
  }, [textToCopy])

  return (
    <TouchableOpacity activeOpacity={0.5} className="p-1" onPress={handleCopy}>
      {Icon ? (
        <View className="p-2 bg-gray-100 rounded-lg">{Icon}</View>
      ) : (
        <Text variant="caption" style={{ color: colors.primary700 }}>
          Copiar
        </Text>
      )}
    </TouchableOpacity>
  )
}
