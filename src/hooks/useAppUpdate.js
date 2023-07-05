import * as Updates from 'expo-updates'
import { useEffect, useState } from 'react'

export function useAppUpdate() {
  const [isUpdateAvailable, setIsUpdateAiailable] = useState(false)

  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        const { isAvailable } = await Updates.checkForUpdateAsync()
        setIsUpdateAiailable(isAvailable)
      } catch (e) {
        console.log('No se ha podido validar actualizaciones', e)
      }
    }

    checkForUpdate()
  }, [])

  const updateApp = async () => {
    try {
      await Updates.fetchUpdateAsync()
      await Updates.reloadAsync()
    } catch (e) {
      console.log('No se ha podido actualizar la app', e)
    }
  }

  return { isUpdateAvailable, updateApp }
}
