import { ScrollView, View } from 'react-native'
import React from 'react'
import Container from '../../components/utils/Container'
import UserSavings from '../../components/user/UserSavings'
import { useGetUserExchangeDataQuery } from '../../services/userData'
import ActivityTabs from '../../navigators/ActivityTabs'
import OrdersChart from '../../components/user/OrdersChart'

export default function ActivityScreen() {
  const { data: exchangeData = {}, isLoading } = useGetUserExchangeDataQuery()

  return (
    <ScrollView>
      <Container>
        <OrdersChart data={exchangeData} />
        <View className='mt-4' />
        <ActivityTabs />
        <View className='mt-4' />
        <UserSavings buy={exchangeData.buy?.amount} sell={exchangeData.sell?.amount} />
      </Container>
    </ScrollView>
  )
}
