import { Pressable, View } from 'react-native'
import React from 'react'
import SafeArea from '../../components/utils/SafeArea'
import Container from '../../components/utils/Container'
import { Text, useTheme } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { useOrders } from '../../hooks/useOrders'
import OrderItem from '../../components/orders/OrderItem'
import UserSavings from '../../components/user/UserSavings'
import Card from '../../components/UI/Card'
import OrdersChart from '../../components/user/OrdersChart'

export default function ActivityScreen({ navigation }) {
  const { orders } = useOrders(5)
  const { colors } = useTheme()

  return (
    <SafeArea>
      <ScrollView>
        <Container>
          <Card classes={['items-center', 'justify-center']}>
            <OrdersChart />
          </Card>

          <Card classes={['mt-6']}>
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
                <Pressable className='w-full p-2' onPress={() => navigation.navigate('AllOperations')}>
                  <Text className='text-center' variant='button' style={{ color: colors.primary700 }}>
                    Ver mas
                  </Text>
                </Pressable>
              </>
            ) : (
              <Text className='text-center'>No has realizado ningún cambio</Text>
            )}
          </Card>
          <View className='mt-6' />
          <UserSavings />
        </Container>
      </ScrollView>
    </SafeArea>
  )
}
