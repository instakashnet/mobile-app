import { View } from 'react-native'
import React, { useMemo } from 'react'
import { Text, ProgressBar, useTheme } from 'react-native-paper'
import Button from '../UI/Button'
import { FontAwesome5 } from '@expo/vector-icons'
import { useGetUserLevelQuery } from '../../services/userData'
import { formatAmount } from '../../helpers/formatters'

export default function UserLevel() {
  const { colors } = useTheme()
  const { data = {}, isLoading } = useGetUserLevelQuery()
  const percentageLeft = useMemo(() => {
    let totalLeft = 0

    let difference = Number(data.totalAmountOrders)
    let total = Number(data.total)

    if (!isNaN(difference) && !isNaN(total)) totalLeft = ((difference / total) * 100) / 100

    return totalLeft
  }, [data.difference])

  return (
    <View className='bg-white p-6'>
      <Text variant='titleLarge' className='text-[36px] leading-[50px]'>
        {formatAmount(data.totalAmountOrders, '$')}
      </Text>
      <View className='flex-row items-center justify-between'>
        <Text>Cambiado en el mes</Text>
        <Text>
          {formatAmount(data.totalAmountOrders, '$')} / <Text variant='button'>{formatAmount(data.total, '$')}</Text>
        </Text>
      </View>
      <View className='mt-2' />
      <ProgressBar progress={percentageLeft} color={colors.primary700} className='bg-gray-200 rounded h-2' />
      <View className='mt-2' />
      <Text variant='button'>
        Nivel: <Text>{data.levelName}</Text>
      </Text>
      <View className='mt-3' />
      <Button icon={() => <FontAwesome5 name='exchange-alt' size={18} color='#fff' />}>Cambiar</Button>
    </View>
  )
}
