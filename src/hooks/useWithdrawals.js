import { useCallback, useEffect, useState } from 'react'

import { formatDate } from '../helpers/formatters'
import { useLazyGetUserWithdrawalsQuery } from '../services/userData'

export function useWithdrawals(limit = 0) {
  const [getWithdrawals, { isFetching }] = useLazyGetUserWithdrawalsQuery()
  const [withdrawals, setWithdrawals] = useState([])

  const getAndFormatWithdrawals = useCallback(
    async withdrawalLimit => {
      try {
        const response = await getWithdrawals(withdrawalLimit).unwrap()

        const formattedWithdrawals = response.map(withdrawal => ({
          id: withdrawal.id,
          uuid: withdrawal.uuid,
          amount: withdrawal.kashQty,
          date: formatDate(withdrawal.createdAt, 'DD MMM'),
          status: {
            name: withdrawal.statusName,
            color: withdrawal.statusColor,
          },
          bankToReceive: {
            name: withdrawal.bankName,
            account: withdrawal.accountToIdRaw,
          },
        }))

        setWithdrawals(formattedWithdrawals)
      } catch (error) {
        console.log(error)
      }
    },
    [getWithdrawals],
  )

  useEffect(() => {
    getAndFormatWithdrawals(limit)
  }, [getAndFormatWithdrawals, limit])

  return { withdrawals, getAndFormatWithdrawals, isLoading: isFetching }
}
