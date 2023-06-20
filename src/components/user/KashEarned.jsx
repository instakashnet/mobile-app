import { View } from 'react-native'
import React from 'react'
import KashIcon from '../../../assets/images/svgs/KashIcon'
import Button from '../UI/Button'
import { Text } from 'react-native-paper'
import { formatAmount } from '../../helpers/formatters'
import Card from '../UI/Card'

export default function KashEarned({ kashInfo, loading, canWithdraw, onPress }) {
  return (
    <Card classes={['flex-row', 'items-center', "justify-between"]}>
      <View className="flex-row items-center">
      <KashIcon width={55} />
      <View className="ml-2">
        <Text variant='button'>{kashInfo?.kash ?? 0} KASH</Text>
        <Text>{formatAmount(kashInfo?.kash, '$')}</Text>
      </View>
      </View>
      <Button variant='secondary' buttonColor='#f1f1f1' onPress={onPress}>
        {canWithdraw ? 'Retirar' : 'Ver más'}
      </Button>
    </Card>
  )
}
