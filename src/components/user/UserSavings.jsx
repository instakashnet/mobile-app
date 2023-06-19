import { View } from 'react-native'
import React, { useMemo } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { Text, useTheme } from 'react-native-paper'
import { formatAmount } from '../../helpers/formatters'

export default function UserSavings({ buy = 0, sell = 0 }) {
  const { colors } = useTheme()
  const savingsValue = useMemo(() => (buy + sell) * 0.008)

  return (
    <View className='p-4 bg-white rounded-lg'>
      <View className='flex-row items-center'>
        <View className='p-6 bg-[#F0F7F8] rounded-full'>
          <FontAwesome5 name='money-bill-alt' size={30} color={colors.primary700} />
        </View>

        <View className='ml-4'>
          <Text>Este mes ahorraste</Text>
          <Text variant='titleLarge' className='mt-2 text-3xl'>
            {formatAmount(savingsValue, '$')}
          </Text>
        </View>
      </View>
      <Text className='text-gray-500 mt-4 text-xs'>
        Tu ahorro mensual hace referencia a nuestro TC en comparación a otras entidades de cambio.
      </Text>
    </View>
  )
}
