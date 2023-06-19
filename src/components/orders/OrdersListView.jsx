import { Text, useTheme } from 'react-native-paper'
import { Pressable } from 'react-native'
import OrderItem from './OrderItem'
import Card from '../UI/Card'
import { useOrders } from '../../hooks/useOrders'

export default function OrdersListView({ navigation }) {
  const { orders } = useOrders(3)
  const { colors } = useTheme()

  return (
    <Card classes={['py-0']}>
      {orders.length > 0 ? (
        <>
          {orders.map((order, idx) => (
            <OrderItem
              key={order.id}
              order={order}
              last={idx + 1 >= orders.length}
              onSelect={() => navigation.navigate('OrderDetails', { order })}
            />
          ))}
          <Pressable className='w-full p-3' onPress={() => navigation.navigate('Orders')}>
            <Text className='text-center' variant='button' style={{ color: colors.primary700 }}>
              Ver mas
            </Text>
          </Pressable>
        </>
      ) : (
        <Text className='text-center'>No has realizado ningún cambio.</Text>
      )}
    </Card>
  )
}
