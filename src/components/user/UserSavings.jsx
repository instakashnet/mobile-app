import { View } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { Text, useTheme } from 'react-native-paper'

export default function UserSavings() {
  const { colors } = useTheme()

  return (
    <View className='p-4 bg-white rounded-lg'>
      <View className='flex-row items-center'>
        <View className='p-6 bg-[#F0F7F8] rounded-full'>
          <FontAwesome5 name='money-bill-alt' size={30} color={colors.primary700} />
        </View>

        <View className='ml-4'>
          <Text>Este mes ahorraste</Text>
          <Text variant='titleLarge' className='mt-2 text-3xl'>
            $50.00
          </Text>
        </View>
      </View>
      <Text className='text-gray-500 mt-4 text-xs'>
        Tu ahorro mensual hace referencia a nuestro TC en comparación a otras entidades de cambio.
      </Text>
    </View>
  )
}
