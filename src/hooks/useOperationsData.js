import { useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper'

export function useOperationsData(data) {
  const [operationsData, setOperationsData] = useState([])
  const { colors } = useTheme()

  useEffect(() => {
    if (data) {
      setOperationsData([
        {
          name: 'Compra',
          population: data.buy?.count || 0,
          color: colors.primary300
        },
        {
          name: 'Venta',
          population: data.sell?.count || 0,
          color: colors.primary500
        }
      ])
    }
  }, [data])

  return { operationsData }
}
