import React from 'react'
import { TextInput, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { Controller } from 'react-hook-form'

const ISO_CURRENCIES = {
  USD: {
    symbol: '$',
    label: 'dólares',
  },
  PEN: {
    symbol: 'S/.',
    label: 'soles',
  },
}

export default function CurrencyInput({ iso, name, control, onAmountChange }) {
  const { fonts, colors } = useTheme()
  const currency = ISO_CURRENCIES[iso]

  const formatCurrency = (text, onChange) => {
    // Remove non-digit characters
    const cleanedText = text.replace(/[^0-9.]/g, '')

    // Format the text as currency
    let formattedText = cleanedText
    if (cleanedText.includes('.')) {
      const parts = cleanedText.split('.')
      formattedText = `${parts[0]}.${parts[1].slice(0, 2)}`
    }

    onChange(formattedText)
    onAmountChange(formattedText, iso)
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <View className="w-full bg-[#E9F6F6] rounded-lg py-1">
          <Text variant="caption" className="ml-4 mt-[2px] -mb-1" style={{ color: colors.primary700 }}>
            Envias {currency?.label}
          </Text>
          <View className="w-full flex-row items-start">
            <TextInput
              value={isNaN(value) ? value : String(value)}
              onChangeText={value => formatCurrency(value, onChange)}
              style={{ fontFamily: fonts.titleSmall.fontFamily }}
              keyboardType="numeric"
              className="pb-1 px-4 min-h-[40px] text-[23px] text-[#0a686a] flex-[.97]"
            />
            <Text variant="titleLarge" className="right-2 text-[28px] leading-[32px]" style={{ color: colors.primary700 }}>
              {currency?.symbol}
            </Text>
          </View>
        </View>
      )}
    />
  )
}
