import { useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper'

export function useOperationsData(data = []) {
  const [operationsData, setOperationsData] = useState(data)
  const { colors } = useTheme()

  useEffect(() => {
    setOperationsData([
      {
        name: 'Compra',
        population: 21500000,
        color: colors.primary300
      },
      {
        name: 'Venta',
        population: 2050000,
        color: colors.primary500
      }
    ])
  }, [])

  return { operationsData }
}
