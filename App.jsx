import 'expo-dev-client'
import 'react-native-gesture-handler'

import * as Poppins from '@expo-google-fonts/poppins'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect, useState } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'

import UpdateModal from './src/components/modals/UpdateModal'
import Toast from './src/components/UI/Toast'
import { useTrackingTransparency } from './src/hooks/permissions/useTrackingTransparency'
import { initSentry } from './src/lib/Sentry'
import MainNavigation from './src/navigators/Main'
import store from './src/store'
import { theme } from './src/theme'
import { translateDatepicker } from './src/utils/translate-datepicker'

translateDatepicker()
if (!__DEV__) initSentry()

export default function App() {
  const [appisReady, setAppIsReady] = useState(false)
  useTrackingTransparency()

  useEffect(() => {
    async function loadResourcesAsync() {
      try {
        SplashScreen.preventAutoHideAsync()
        await Font.loadAsync({
          'poppins-light': Poppins.Poppins_300Light,
          'poppins-regular': Poppins.Poppins_400Regular,
          'poppins-semibold': Poppins.Poppins_600SemiBold,
        })
      } catch (error) {
        console.log(error)
      } finally {
        setAppIsReady(true)
      }
    }
    loadResourcesAsync()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appisReady) await SplashScreen.hideAsync()
  }, [appisReady])

  return (
    appisReady && (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <MainNavigation onLayout={onLayoutRootView} />
          <Toast />
          <UpdateModal />
        </PaperProvider>
        <StatusBar style="auto" />
      </Provider>
    )
  )
}
