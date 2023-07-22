import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Text, useTheme } from 'react-native-paper'

export default function Rates({ rates, type, coupon, loading }) {
  const { colors } = useTheme()
  const ratesToShow = coupon?.rates || rates

  if (loading)
    return (
      <View className="items-center justify-center mb-3">
        <ActivityIndicator size="small" color={colors.primary700} />
      </View>
    )

  return (
    <View className="flex-row items-center gap-3 p-3 self-center">
      <View className="items-center">
        {coupon && (
          <Text variant="button" className="text-xs line-through" style={{ opacity: type === 'sell' ? 0.4 : 1 }}>
            Antes: {rates?.buy?.toFixed(4)}
          </Text>
        )}
        <Text variant="button" style={{ color: colors.primary700, opacity: type === 'sell' ? 0.4 : 1 }}>
          Compra: {ratesToShow?.buy?.toFixed(4) || '0.0000'}
        </Text>
      </View>
      <View className="h-full border-[1px] border-gray-300" />
      <View className="items-center">
        {coupon && (
          <Text variant="button" className="text-xs line-through " style={{ opacity: type === 'buy' ? 0.4 : 1 }}>
            Antes: {rates?.sell?.toFixed(4)}
          </Text>
        )}
        <Text variant="button" style={{ color: colors.primary700, opacity: type === 'buy' ? 0.4 : 1 }}>
          Venta: {ratesToShow?.sell?.toFixed(4) || '0.0000'}
        </Text>
      </View>
    </View>
  )
}
