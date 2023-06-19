import { TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { Text } from 'react-native-paper'
import { lightenColor } from '../../helpers/colors'

export default function StatusBadge({ status = {} }) {
  // const bgColor = useMemo(() => lightenColor(status.color, 180), [status.color])

  return (
    <View activeOpacity={0.7} className='rounded-lg border-[1px] px-2 py-1' style={{ borderColor: status.color }}>
      <Text variant='caption' style={{ color: status.color }}>
        {status.name}
      </Text>
    </View>
  )
}
