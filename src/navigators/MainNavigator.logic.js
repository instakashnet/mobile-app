import { useDispatch, useSelector } from 'react-redux'

import { useLazyGetBanksQuery, useLazyGetCurrenciesQuery } from '../services/account'
import { selectIsSignedIn } from '@/store/slices/authSlice'
import { useSavePushTokenMutation } from '@/services/auth'
import { useNotificationsPermissions } from '@/hooks/notifications/useNotificationsPermissions'
import { useUpdate } from '@/hooks/useUpdate'
import { setBanks, setCurrencies } from '@/store/slices/appData'

export function useMainNavigatorLogic() {
  const isSignedIn = useSelector(selectIsSignedIn)
  const dispatch = useDispatch()
  const [getBanks] = useLazyGetBanksQuery()
  const [getCurrencies] = useLazyGetCurrenciesQuery()
  const [saveToken] = useSavePushTokenMutation()
  const { permissionStatus, getPushToken } = useNotificationsPermissions()

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

  return { isSignedIn }
}
