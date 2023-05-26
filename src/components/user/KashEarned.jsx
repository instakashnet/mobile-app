import { View } from 'react-native'
import React from 'react'
import KashIcon from '../../../assets/images/svgs/KashIcon'
import Button from '../UI/Button'
import { Text } from 'react-native-paper'
import { formatAmount } from '../../helpers/formatters'
import Card from '../UI/Card'

export default function KashEarned({ kashInfo, loading, onPress }) {
  return (
    <Card classes={['flex-row', 'items-center']}>
      <KashIcon width={55} />
      <View className='ml-3'>
        <Text variant='button'>{kashInfo?.kash ?? 0} KASH</Text>
        <Text>{formatAmount(kashInfo?.kash, '$')}</Text>
      </View>
      <Button variant='secondary' buttonColor='#f1f1f1' className='ml-auto' onPress={onPress}>
        Ver más
      </Button>
    </Card>
  )
}
