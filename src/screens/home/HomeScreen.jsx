import { Pressable, ScrollView, View } from 'react-native'
import React from 'react'
import UserLevel from '../../components/user/UserLevel'
import KashEarned from '../../components/user/KashEarned'
import Link from '../../components/utils/Link'
import { Text } from 'react-native-paper'
import { useOrders } from '../../hooks/useOrders'
// import OrdersList from '../../components/orders/OrdersList'
import OrderItem from '../../components/orders/OrderItem'
import Container from '../../components/utils/Container'
import { useGetUserKashQuery } from '../../services/userData'
import Card from '../../components/UI/Card'

export default function HomeScreen({ navigation }) {
  const { orders = [] } = useOrders(3)
  const { data = {}, isLoading } = useGetUserKashQuery()

  return (
    <ScrollView>
      <UserLevel />
      <Container>
        <Text variant='button' className='mb-2'>
          Refiere y gana
        </Text>
        <KashEarned kashInfo={data} loading={isLoading} onPress={() => navigation.navigate('ReferralScreen')} />
        <View className='mt-6' />
        <View className='flex-row items-center justify-between'>
          <Text>Pedidos realizados</Text>
          <Pressable onPress={() => navigation.navigate('Operations', { screen: 'AllOperations' })}>
            <Link>Ver todas</Link>
          </Pressable>
        </View>
        <View className='mt-3' />
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
            </>
          ) : (
            <Text className='text-center'>No has realizado ningún cambio.</Text>
          )}

          {/* <OrdersList data={orders} /> */}
        </Card>
      </Container>
    </ScrollView>
  )
}
