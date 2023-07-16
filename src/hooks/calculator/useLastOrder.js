import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useEffect } from 'react'
import { Alert } from 'react-native'

import { useCancelExchangeMutation, useGetLastOrderQuery } from '../../services/exchange'

export function useLastOrder() {
  const { data: lastOrder, isFetching } = useGetLastOrderQuery('lastOrder', { refetchOnFocus: true, refetchOnMountOrArgChange: true })
  const navigation = useNavigation()
  const [cancelExchange] = useCancelExchangeMutation()

  const cancelOrder = useCallback(
    async order => {
      try {
        await cancelExchange({ orderId: order.id, cancelType: 'order' })
      } catch (error) {
        console.log(error)
      }
    },
    [cancelExchange],
  )

  useEffect(() => {
    if (lastOrder) {
      Alert.alert('Orden en proceso', 'tienes una orden en proceso, ¿deseas completarla?', [
        { text: 'SI', onPress: () => navigation.navigate('Transfer', { order: lastOrder }) },
        { text: 'NO', onPress: () => cancelOrder(lastOrder) },
      ])
    }
  }, [lastOrder, cancelOrder, navigation])

  return { lastOrder, isFetching }
}
