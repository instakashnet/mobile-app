import { TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { Text, useTheme } from 'react-native-paper'
import * as Clipboard from 'expo-clipboard'

export default function CopyButton({ textToCopy, icon = null }) {
  const { colors } = useTheme()

  const handleCopy = useCallback(async () => {
    try {
      await Clipboard.setStringAsync(textToCopy)
    } catch (error) {
      console.log('copy text error', error)
    }
  }, [textToCopy])

  return (
    <TouchableOpacity activeOpacity={0.5} className='p-1' onPress={handleCopy}>
      {icon || (
        <Text variant='caption' style={{ color: colors.primary700 }}>
          Copiar
        </Text>
      )}
    </TouchableOpacity>
  )
}
