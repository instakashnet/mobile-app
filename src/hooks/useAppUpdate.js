import * as Updates from 'expo-updates'
import { useEffect } from 'react'

export function useAppUpdate() {
  const checkForUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync()
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    checkForUpdate()
  }, [])
}
