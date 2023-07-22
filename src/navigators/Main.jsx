import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { adaptNavigationTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import ScheduleModal from '@/components/modals/ScheduleModal'
import SafeArea from '@/components/utils/SafeArea'
import Updater from '@/hoc/Updater'
import { useNotificationsPermissions } from '@/hooks/notifications/useNotificationsPermissions'
import { useRefresh } from '@/hooks/useRefresh'
import { useUpdate } from '@/hooks/useUpdate'
import LoadingScreen from '@/screens/LoadingScreen'
import { useLazyGetBanksQuery, useLazyGetCurrenciesQuery } from '@/services/account'
import { useSavePushTokenMutation } from '@/services/auth'
import { setBanks, setCurrencies } from '@/store/slices/appData'
import { selectIsSignedIn } from '@/store/slices/authSlice'

import AuthNavigator from './AuthNavigator'
import DrawerNavigator from './DrawerNavigator'

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
})

export default function MainNavigation({ onLayout }) {
  const isSignedIn = useSelector(selectIsSignedIn)
  const dispatch = useDispatch()
  const [getBanks] = useLazyGetBanksQuery()
  const [getCurrencies] = useLazyGetCurrenciesQuery()
  const [saveToken] = useSavePushTokenMutation()
  const { permissionStatus, getPushToken } = useNotificationsPermissions()
  const { isSessionLoading } = useRefresh()

  useUpdate(() => {
    const getAppData = async () => {
      try {
        const [banks, currencies] = await Promise.all([await getBanks().unwrap(), await getCurrencies().unwrap()])
        dispatch(setCurrencies(currencies))
        dispatch(setBanks(banks))
      } catch (error) {
        console.log(error)
      }
    }

    if (isSignedIn) {
      getAppData()

      if (permissionStatus === 'granted') {
        const updateToken = async () => {
          try {
            const token = await getPushToken()
            await saveToken({ token }).unwrap()
          } catch (error) {
            console.log(error)
          }
        }

        updateToken()
      }
    }
  }, [isSignedIn, permissionStatus])

  if (isSessionLoading) return <LoadingScreen />

  return (
    <NavigationContainer theme={LightTheme} onReady={onLayout}>
      <Updater>
        {!isSignedIn ? (
          <SafeArea>
            <AuthNavigator />
          </SafeArea>
        ) : (
          <>
            <DrawerNavigator />
            <ScheduleModal />
          </>
        )}
      </Updater>
    </NavigationContainer>
  )
}
