import { StatusBar } from 'expo-status-bar'
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import { useCallback, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Poppins from '@expo-google-fonts/poppins'
import * as Font from 'expo-font'
import 'expo-dev-client'

import { Alert } from 'react-native'

import { theme } from './src/theme'
import MainNavigation from './src/navigators/Main'
import store from './src/store'
import 'react-native-gesture-handler'
import { translateDatepicker } from './src/utils/translate-datepicker'
import Toast from './src/components/UI/Toast'
import { useAppUpdate } from './src/hooks/useAppUpdate'
import { initSentry } from './src/lib/Sentry'

translateDatepicker()
if (!__DEV__) initSentry()

export default function App() {
  const [appisReady, setAppIsReady] = useState(false)
  const { isUpdateAvailable, updateApp } = useAppUpdate()

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
    if (appisReady) {
      await SplashScreen.hideAsync()
      if (isUpdateAvailable) {
        Alert.alert('Actualización disponbile', 'Hay una actualización disponible, ¿deseas actualizar la aplicación?', [
          { text: 'Actualizar', onPress: updateApp },
          { text: 'Cancelar' },
        ])
      }
    }
  }, [appisReady, isUpdateAvailable, updateApp])

  return (
    appisReady && (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <MainNavigation onLayout={onLayoutRootView} />
          <Toast />
        </PaperProvider>
        <StatusBar style="auto" />
      </Provider>
    )
  )
}
