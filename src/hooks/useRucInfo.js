import { useState } from 'react'

export function useRucInfo() {
  const [rucInfo, setRucInfo] = useState(null)
  const [error, setError] = useState(null)

  const validateRuc = async (value) => {
    try {
      const response = await fetch('https://api.migo.pe/api/v1/ruc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: '19wQ2rR8CS6kkpXt0H5m6JtnPWAbqXTxGYiLd2sawzPMLh7YWnn83crMz1fb', ruc: value })
      })

      const parsedResponse = await response.json()
      setRucInfo(parsedResponse)
      setError(null)
    } catch (error) {
      setRucInfo(null)
      setError(error)
    }
  }

  return { rucInfo, validateRuc, error }
}
