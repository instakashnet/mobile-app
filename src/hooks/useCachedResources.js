import { useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import * as Poppins from '@expo-google-fonts/poppins'

import { checkUpdates } from '@/helpers/check-updates'

export function useCachedResources() {
  const [isAppReady, setIsAppReady] = useState(false)

  useEffect(() => {
    async function loadResourcesAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        await checkUpdates()

        await Font.loadAsync({
          'poppins-light': Poppins.Poppins_300Light,
          'poppins-regular': Poppins.Poppins_400Regular,
          'poppins-semibold': Poppins.Poppins_600SemiBold,
        })
      } catch (error) {
        console.warn(error)
      } finally {
        setIsAppReady(true)
      }
    }

    loadResourcesAsync()
  }, [])

  return isAppReady
}
