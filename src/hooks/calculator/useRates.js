import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/core'

import { useLazyGetRatesQuery } from '../../services/exchange'

export function useRates() {
  const [rates, setRates] = useState({ buy: 0, sell: 0 })
  const [getRates, { isFetching }] = useLazyGetRatesQuery('')

  const getCurrentRates = useCallback(async () => {
    try {
      const response = await getRates().unwrap()
      setRates(response)
    } catch (error) {
      console.log(error)
    }
  }, [getRates])

  useFocusEffect(
    useCallback(() => {
      getCurrentRates()
    }, [getCurrentRates]),
  )

  return { rates, isLoading: isFetching, getRates: getCurrentRates }
}
