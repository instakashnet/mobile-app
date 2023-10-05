import { Pressable } from 'react-native'
import { useTheme } from 'react-native-paper'

import { useOrders } from '../../hooks/useOrders'
import Card from '../UI/Card'
import OrderItemLoader from './ItemLoader'
import OrderItem from './OrderItem'
import Text from '../utils/Text'

export default function OrdersListView({ navigation }) {
  const { orders, isLoading } = useOrders(3)
  const { colors } = useTheme()

  if (isLoading) return Array.from({ length: 3 }).map((_, i) => <OrderItemLoader key={i} />)

  return (
    <Card classes={['py-4']}>
      {orders.length > 0 ? (
        <>
          {orders.map((order, idx) => (
            <OrderItem
              key={idx}
              order={order}
              last={idx + 1 >= orders.length}
              onSelect={() => navigation.navigate('OrderDetails', { order })}
            />
          ))}
          <Pressable className="w-full p-3" onPress={() => navigation.navigate('Orders')}>
            <Text className="text-center" variant="button" style={{ color: colors.primary700 }}>
              Ver mas
            </Text>
          </Pressable>
        </>
      ) : (
        <Text className="text-center">No has realizado ningún cambio.</Text>
      )}
    </Card>
  )
}
