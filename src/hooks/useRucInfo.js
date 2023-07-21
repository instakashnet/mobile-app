import { useState } from 'react'
import { set } from 'react-native-reanimated'

export function useRucInfo() {
  const [rucInfo, setRucInfo] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const validateRuc = async value => {
    setIsLoading(true)

    try {
      const response = await fetch('https://api.migo.pe/api/v1/ruc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: '19wQ2rR8CS6kkpXt0H5m6JtnPWAbqXTxGYiLd2sawzPMLh7YWnn83crMz1fb', ruc: value }),
      })

      const parsedResponse = await response.json()
      setRucInfo(parsedResponse)
      setError(null)
    } catch (error) {
      setRucInfo(null)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { rucInfo, validateRuc, error, isLoading }
}
