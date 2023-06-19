import { View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useOrders } from '../../hooks/useOrders'
import Container from '../../components/utils/Container'
import OrdersList from '../../components/orders/OrdersList'

export default function OrdersScreen() {
  const [ordersCount, setOrdersCount] = useState(10)
  const { orders, getuserOrders, isLoading } = useOrders(10)

  const handleLoadMore = async () => {
    if (orders?.length < ordersCount) return

    try {
      const newCount = ordersCount + 5
      await getuserOrders(newCount)
      setOrdersCount(newCount)
    } catch (error) {
      crossOriginIsolated.log(error)
    }
  }

  const renderFooter = () => {
    // Display a loading indicator while loading more data
    return isLoading ? (
      <View className='p-4'>
        <ActivityIndicator size='large' color='gray' />
      </View>
    ) : null
  }

  return (
    <Container>
      <OrdersList
        data={orders}
        listProps={{
          showsVerticalScrollIndicator: false,
          ListFooterComponent: renderFooter,
          onEndReached: handleLoadMore,
          onEndReachedThreshold: 0.1
        }}
      />
    </Container>
  )
}
