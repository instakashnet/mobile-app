import { useEffect } from 'react'
import { getSecureData } from '../lib/SecureStore'
import { useGetRefreshMutation } from '../services/auth'
import { useDispatch } from 'react-redux'
import { setCredentials, setLogout } from '../store/slices/authSlice'

export function useRefresh() {
  const [refreshSession, { isLoading }] = useGetRefreshMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    const setRefreshSession = async () => {
      try {
        const token = await getSecureData('refreshToken')
        if (token) {
          const response = await refreshSession(token).unwrap()
          dispatch(setCredentials({ accessToken: response.accessToken, user: response.user }))
        }
      } catch (error) {
        console.log(error)
        dispatch(setLogout())
      }
    }

    setRefreshSession()
  }, [])

  return { isSessionLoading: isLoading }
}
