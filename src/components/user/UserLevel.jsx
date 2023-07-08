import { View } from 'react-native'
import React, { useMemo } from 'react'
import { Text, ProgressBar, useTheme } from 'react-native-paper'
import Button from '../UI/Button'
import { FontAwesome5 } from '@expo/vector-icons'
import { useGetUserLevelQuery } from '../../services/userData'
import { formatAmount } from '../../helpers/formatters'
import { useNavigation } from '@react-navigation/native'
import Skeleton from '../UI/Skeleton'

export default function UserLevel() {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { data = {}, isLoading } = useGetUserLevelQuery()
  const percentageLeft = useMemo(() => {
    let totalLeft = 0
    const difference = Number(data.totalAmountOrders)
    const total = Number(data.total)

    if (!isNaN(difference) && !isNaN(total)) totalLeft = ((difference / total) * 100) / 100

    return totalLeft
  }, [data])

  return (
    <View className="bg-white p-6">
      <View className="flex-row items-center justify-between">
        <Text>Cambiado en el mes</Text>
        {isLoading ? (
          <Skeleton width={100} height={20} />
        ) : (
          <Text>
            {formatAmount(data.totalAmountOrders, '$')} / <Text variant="button">{formatAmount(data.total, '$')}</Text>
          </Text>
        )}
      </View>
      <View className="mt-2" />
      <ProgressBar progress={percentageLeft} color={colors.primary700} className="bg-gray-200 rounded h-2" />
      <View className="mt-2" />
      {isLoading ? (
        <Skeleton width={100} height={20} />
      ) : (
        <Text variant="button">
          Nivel: <Text>{data.levelName}</Text>
        </Text>
      )}

      <View className="mt-3" />
      <Button onPress={() => navigation.navigate('Exchange')} icon={() => <FontAwesome5 name="exchange-alt" size={18} color="#fff" />}>
        Cambiar
      </Button>
    </View>
  )
}
