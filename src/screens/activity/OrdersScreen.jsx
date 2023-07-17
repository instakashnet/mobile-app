import React, { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

import OrdersList from '../../components/orders/OrdersList'
import { useOrders } from '../../hooks/useOrders'

export default function OrdersScreen() {
  const [ordersCount, setOrdersCount] = useState(10)
  const { orders, getuserOrders, isLoading } = useOrders(10)

  const handleLoadMore = async () => {
    if (orders?.length < ordersCount || isLoading) return

    try {
      const newCount = ordersCount + 5
      await getuserOrders(newCount)
      setOrdersCount(newCount)
    } catch (error) {
      console.log(error)
    }
  }

  const renderFooter = () => {
    // Display a loading indicator while loading more data
    return isLoading ? (
      <View className="p-4">
        <ActivityIndicator size="large" color="gray" />
      </View>
    ) : null
  }

  return (
    <View className="flex-1 px-6">
      <OrdersList
        isLoading={isLoading}
        data={orders}
        listProps={{
          refreshing: isLoading,
          onRefresh: () => getuserOrders(ordersCount),
          showsVerticalScrollIndicator: false,
          ListFooterComponent: renderFooter,
          onEndReached: handleLoadMore,
          onEndReachedThreshold: 0.1,
        }}
      />
    </View>
  )
}
