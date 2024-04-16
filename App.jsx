import 'expo-dev-client'
import 'react-native-gesture-handler'

import { StatusBar } from 'expo-status-bar'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'

import Toast from './src/components/UI/Toast'
import { useTrackingTransparency } from './src/hooks/permissions/useTrackingTransparency'
import { initSentry } from './src/lib/Sentry'
import store from './src/store'
import { theme } from './src/theme'
import Main from '@/Main'
import { useCachedResources } from '@/hooks/useCachedResources'
import UpdateModal from '@/components/modals/UpdateModal'

if (!__DEV__) initSentry()

export default function App() {
  useTrackingTransparency()
  const appIsReady = useCachedResources()

  return (
    appIsReady && (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <Main />
          <Toast />
          <UpdateModal />
        </PaperProvider>
        <StatusBar style="auto" />
      </Provider>
    )
  )
}
