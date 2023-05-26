import { useState } from 'react'
import { formatAmount, formatDate } from '../helpers/formatters'
import { useUpdate } from './useUpdate'
import { useGetUserOrdersQuery } from '../services/userData'

export function useOrders(limit = 5) {
  const [mappedOrders, setMappedOrders] = useState([])
  const { data = [], isLoading, refetch } = useGetUserOrdersQuery({ from: 0, limit })

  useUpdate(() => {
    if (data.length > 0) {
      let orders = data.map((order) => ({
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
          color: order.stateColor
        },
        accToSend: order.accountFromRaw,
        accToReceive: order.accountToRaw,
        type: order.type === 'sell' ? 'compra' : 'venta'
      }))

      setMappedOrders(orders)
    }
  }, [data])

  return { orders: mappedOrders, refetch, isLoading }
}
