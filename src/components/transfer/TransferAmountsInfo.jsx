import React from 'react'
import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

import { formatAmount } from '../../helpers/formatters'
import Title from '../utils/Title'

export default function TransferAmountsInfo({ amountToSend = 0, currencyToSend, amountToReceive = 0, currencyToReceive, rate }) {
  const { fonts, colors } = useTheme()

  return (
    <View className="px-3 py-2 my-4 border-t border-b flex-row items-center justify-between" style={{ borderColor: colors.primary700 }}>
      <Title>{formatAmount(amountToSend, currencyToSend)}</Title>
      <View className="items-end gap-y-1">
        <Text variant="caption">
          <Text variant="caption" style={{ fontFamily: fonts.button.fontFamily }}>
            Recibe:
          </Text>{' '}
          {formatAmount(amountToReceive, currencyToReceive)}
        </Text>
        <Text variant="caption">
          <Text style={{ fontFamily: fonts.button.fontFamily }} variant="caption">
            TC:
          </Text>{' '}
          {rate?.toFixed(4)}
        </Text>
      </View>
    </View>
  )
}
