import { useCallback, useEffect, useState } from 'react'

import { formatAmount, formatDate } from '../helpers/formatters'
import { useLazyGetUserOrdersQuery } from '../services/userData'

export function useOrders(limit = 5) {
  const [mappedOrders, setMappedOrders] = useState([])
  const [getOrders, { isFetching }] = useLazyGetUserOrdersQuery()

  const getuserOrders = useCallback(
    async ordersLimit => {
      try {
        const response = await getOrders({ from: 0, limit: ordersLimit }).unwrap()
        const orders = response.map(order => ({
          id: order.id,
          date: order.completedAt ?? order.created,
          dateString: order.completedAt
            ? formatDate(order.completedAt, { month: 'short', day: 'numeric' })
            : formatDate(order.created, { month: 'short', day: 'numeric' }),
          orderId: order.uuid,
          amountToSend: formatAmount(order.amountSent, order.currencySentSymbol),
          amountToReceive: formatAmount(order.amountReceived, order.currencyReceivedSymbol),
          rate: order.rate?.toFixed(4),
          status: {
            id: order.estateId,
            name: order.estateName,
            color: order.stateColor,
          },
          accToSend: order.accountFromRaw,
          accToReceive: order.accountToRaw,
          type: order.type === 'sell' ? 'compra' : 'venta',
        }))

        setMappedOrders(orders)
      } catch (error) {
        setMappedOrders([])
      }
    },
    [getOrders],
  )

  useEffect(() => {
    getuserOrders(limit)
  }, [limit, getuserOrders])

  return { orders: mappedOrders, getuserOrders, isLoading: isFetching }
}
