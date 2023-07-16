import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

import bankImages from '../../../data/bankImages'
import Card from '../UI/Card'
import CopyButton from '../UI/CopyButton'

export default function AccountInfo({ bank, account }) {
  const { colors } = useTheme()

  return (
    <Card classes={['flex-row', 'items-center', 'justify-between']}>
      <Image source={bankImages[bank?.toLowerCase()]?.image} className="w-[70px] h-6" resizeMode="contain" />
      <View className="flex-row items-center">
        <View className="items-end mr-2">
          <Text variant="caption" className="mb-1" style={{ color: colors.primary700 }}>
            Cuenta corriente soles
          </Text>
          <Text numberOfLines={1}>{account}</Text>
        </View>
        <CopyButton textToCopy={account} icon={<Ionicons name="copy-outline" color={colors.primary700} size={16} />} />
      </View>
    </Card>
  )
}
