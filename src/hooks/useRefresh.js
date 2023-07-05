import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { getSecureData } from '../lib/SecureStore'
import { useGetRefreshMutation } from '../services/auth'
import { setCredentials, setLogout } from '../store/slices/authSlice'

export function useRefresh() {
  const [isLoading, setIsLoading] = useState(true)
  const [refreshSession] = useGetRefreshMutation()
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
      } finally {
        setIsLoading(false)
      }
    }

    setRefreshSession()
  }, [dispatch, refreshSession])

  return { isSessionLoading: isLoading }
}
