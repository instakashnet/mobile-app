import React from 'react'
import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { selectSchedule } from '../../store/slices/appData'

export default function Hours() {
  const { colors } = useTheme()
  const schedule = useSelector(selectSchedule)
  const statusColors = {
    text: schedule?.status === 'closed' ? colors.error : colors.primary700,
    bg: schedule?.status === 'closed' ? colors.error100 : colors.primary100,
  }

  return (
    <View className="px-4 py-3 rounded-lg" style={{ backgroundColor: statusColors.bg }}>
      <Text style={{ color: statusColors.text }}>
        {schedule?.status === 'closed' ? 'Cerrados' : 'Abiertos'}: {schedule?.timeRange}
      </Text>
    </View>
  )
}
