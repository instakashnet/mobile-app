import { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

import WithdrawsList from '../../components/orders/WithdrawsList'
import { useWithdrawals } from '../../hooks/useWithdrawals'

function WithdrawalsScreen() {
  const [count, setCount] = useState(10)
  const { withdrawals, getAndFormatWithdrawals, isLoading } = useWithdrawals(10)

  const handleLoadMore = async () => {
    if (withdrawals?.length < count || isLoading) return

    try {
      const newCount = count + 5
      await getAndFormatWithdrawals(newCount)
      setCount(newCount)
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
      <WithdrawsList
        data={withdrawals}
        listProps={{
          refreshing: isLoading,
          onRefresh: () => getAndFormatWithdrawals(count),
          showsVerticalScrollIndicator: false,
          ListFooterComponent: renderFooter,
          onEndReached: handleLoadMore,
          onEndReachedThreshold: 0.1,
        }}
      />
    </View>
  )
}

export default WithdrawalsScreen
