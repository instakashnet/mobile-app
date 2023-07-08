import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { adaptNavigationTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import AuthNavigator from './AuthNavigator'
import { selectIsSignedIn } from '../store/slices/authSlice'
import DrawerNavigator from './DrawerNavigator'
import SafeArea from '../components/utils/SafeArea'
import { useRefresh } from '../hooks/useRefresh'
import { useUpdate } from '../hooks/useUpdate'
import { useLazyGetBanksQuery, useLazyGetCurrenciesQuery } from '../services/account'
import { setBanks, setCurrencies } from '../store/slices/app-data'
import { useNotificationsPermissions } from '../hooks/notifications/useNotificationsPermissions'
import { useSavePushTokenMutation } from '../services/auth'
import LoadingScreen from '../screens/LoadingScreen'
import ScheduleInfo from '../hoc/Schedule'

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
      {!isSignedIn ? (
        <SafeArea>
          <AuthNavigator />
        </SafeArea>
      ) : (
        <ScheduleInfo>
          <DrawerNavigator />
        </ScheduleInfo>
      )}
    </NavigationContainer>
  )
}
