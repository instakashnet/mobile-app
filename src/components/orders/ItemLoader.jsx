import { View } from 'react-native'

import Skeleton from '../UI/Skeleton'

function OrderItemLoader() {
  return (
    <View className="flex-row items-center my-3">
      <Skeleton width={50} height={50} borderRadius={4} marginRight={12} />
      <View className="mr-auto">
        <Skeleton width={100} height={20} borderRadius={4} marginVertical={4} />
        <Skeleton width={100} height={20} borderRadius={4} marginVertical={4} />
      </View>
      <Skeleton width={100} height={35} borderRadius={4} />
    </View>
  )
}

export default OrderItemLoader
