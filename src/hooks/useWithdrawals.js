import { useEffect, useState } from 'react'
import { useLazyGetUserWithdrawalsQuery } from '../services/userData'
import { formatDate } from '../helpers/formatters'

export function useWithdrawals(limit = 0) {
  const [getWithdrawals] = useLazyGetUserWithdrawalsQuery()
  const [withdrawals, setWithdrawals] = useState([])

  const getAndFormatWithdrawals = async () => {
    try {
      const response = await getWithdrawals(limit).unwrap()

      const formattedWithdrawals = response.map((withdrawal) => ({
        id: withdrawal.id,
        uuid: withdrawal.uuid,
        amount: withdrawal.kashQty,
        date: formatDate(withdrawal.createdAt, { month: 'short', day: 'numeric' }),
        status: {
          name: withdrawal.statusName,
          color: withdrawal.statusColor
        },
        bankToReceive: {
          name: withdrawal.bankName,
          account: withdrawal.accountToIdRaw
        }
      }))

      setWithdrawals(formattedWithdrawals)
    } catch (error) {}
  }

  useEffect(() => {
    getAndFormatWithdrawals()
  }, [])

  return { withdrawals, getAndFormatWithdrawals }
}
