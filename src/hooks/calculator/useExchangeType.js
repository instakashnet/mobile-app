import { useState } from 'react'

export function useExchangeType() {
  const [exchangeType, setExchangeType] = useState('sell')

  const handleSwipeExchangeType = (rates, amount = 0, setValue) => {
    const newType = exchangeType === 'sell' ? 'buy' : 'sell'

    setExchangeType(newType)
    const newAmount = exchangeType === 'sell' ? amount * rates?.buy : amount / rates?.sell
    setValue('amount_received', newAmount?.toFixed(2))
    setValue('type', newType)
  }

  return { exchangeType, handleSwipeExchangeType }
}
