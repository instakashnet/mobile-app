import { Image, View } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import CopyButton from '../UI/CopyButton'
import { Ionicons } from '@expo/vector-icons'
import Card from '../UI/Card'
import bankImages from '../../../data/bankImages'

export default function AccountInfo({ bank, account }) {
  const { colors } = useTheme()

  return (
    <Card classes={['flex-row', 'items-center', 'justify-between']}>
      <Image source={bankImages[bank?.toLowerCase()]?.image} className='w-[70px] h-6' resizeMode='contain' />
      <View className='flex-row items-center gap-x-3 max-w-[200px]'>
        <View className='items-end'>
          <Text variant='caption' className='mb-1' style={{ color: colors.primary700 }}>
            Cuenta corriente soles
          </Text>
          <Text numberOfLines={1}>{account}</Text>
        </View>
        <View className='p-1 bg-gray-200 rounded-lg'>
          <CopyButton icon={<Ionicons name='copy-outline' color={colors.primary700} size={16} />} />
        </View>
      </View>
    </Card>
  )
}
