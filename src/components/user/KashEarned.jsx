import { View } from 'react-native'
import React from 'react'

import KashIcon from '../../../assets/images/svgs/KashIcon'
import Button from '../UI/Button'
import Card from '../UI/Card'
import Skeleton from '../UI/Skeleton'
import Text from '../utils/Text'

export default function KashEarned({ kashInfo, loading = false, canWithdraw, onPress }) {
  if (loading)
    return (
      <View className="flex-row items-center justify-between my-3">
        <Skeleton width={55} height={55} borderRadius={100} marginRight={12} />
        <Skeleton width={120} height={30} />
        <View className="ml-auto" />
        <Skeleton width={80} height={40} />
      </View>
    )

  return (
    <Card classes={['flex-row', 'items-center', 'justify-between']}>
      <View className="flex-row items-center">
        <KashIcon width={55} />
        <View className="ml-2">
          <Text variant="button">{kashInfo?.kash ?? 0} KASH</Text>
          <Text>${Number(kashInfo?.kash)?.toFixed(2)}</Text>
        </View>
      </View>
      <Button className="mt-4" variant="secondary" buttonColor="#f1f1f1" onPress={onPress}>
        {canWithdraw ? 'Retirar' : 'Ver más'}
      </Button>
    </Card>
  )
}
