import { StatusBar } from 'expo-status-bar'
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import store from './src/store'
import MainNavigation from './src/navigators/Main'
import { theme } from './src/theme'
import { useCallback, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
// import { cacheFonts } from './src/helpers/caching'
import * as Poppins from '@expo-google-fonts/poppins'
import * as Font from 'expo-font'
import Alert from './src/components/UI/Alert'
import 'react-native-gesture-handler'
import { translateDatepicker } from './src/utils/translate-datepicker'

translateDatepicker()

export default function App() {
  const [appisReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function loadResourcesAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        await Font.loadAsync({
          'poppins-light': Poppins.Poppins_300Light,
          'poppins-regular': Poppins.Poppins_400Regular,
          'poppins-semibold': Poppins.Poppins_600SemiBold
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
    if (appisReady) SplashScreen.hideAsync()
  }, [appisReady])

  return (
    appisReady && (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <MainNavigation onLayout={onLayoutRootView} />
          <Alert />
        </PaperProvider>
        <StatusBar style='auto' />
      </Provider>
    )
  )
}
