import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { Banner as PaperBanner, Text, useTheme } from 'react-native-paper'

const BANNER_TYPES = [
  {
    type: 'warning',
    icon: 'warning-outline',
    colors: { text: '#ffc107', bg: '#ece6d4' },
  },
  {
    type: 'info',
    icon: 'information-circle-outline',
    colors: { text: '#0288d1', bg: '#dbf4ff' },
  },
]

export default function Banner({ dismissable, children, type = 'info', actions = [] }) {
  const [visible, setVisible] = useState(true)
  const { colors } = useTheme()

  const bannerType = BANNER_TYPES.find(banner => banner.type === type) || {}

  return (
    <PaperBanner
      visible={visible}
      className="shadow-none rounded-lg mt-0"
      contentStyle={{ backgroundColor: bannerType?.colors?.bg }}
      actions={
        dismissable
          ? [
              {
                label: (
                  <Pressable onPress={() => setVisible(false)}>
                    <Text variant="button" style={{ color: colors.primary700 }}>
                      Aceptar
                    </Text>
                  </Pressable>
                ),
                onPress: () => setVisible(false),
              },
            ]
          : actions
      }
      icon={() => <Ionicons name={bannerType?.icon} size={30} color={bannerType?.colors?.text} />}>
      {children}
    </PaperBanner>
  )
}
