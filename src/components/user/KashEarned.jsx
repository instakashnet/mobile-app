import { View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

import KashIcon from '../../../assets/images/svgs/KashIcon'
import Button from '../UI/Button'
import Card from '../UI/Card'

export default function KashEarned({ kashInfo, loading, canWithdraw, onPress }) {
  return (
    <Card classes={['flex-row', 'items-center', 'justify-between']}>
      <View className="flex-row items-center">
        <KashIcon width={55} />
        <View className="ml-2">
          <Text variant="button">{kashInfo?.kash ?? 0} KASH</Text>
          <Text>${Number(kashInfo?.kash)?.toFixed(2)}</Text>
        </View>
      </View>
      <Button variant="secondary" buttonColor="#f1f1f1" onPress={onPress}>
        {canWithdraw ? 'Retirar' : 'Ver más'}
      </Button>
    </Card>
  )
}
