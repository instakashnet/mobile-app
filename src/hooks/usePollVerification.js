import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'

import { useLazyGetUserQuery } from '../services/user'
import { setUser } from '../store/slices/authSlice'

export function usePollverificiation() {
  const [getUser] = useLazyGetUserQuery()
  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  useEffect(() => {
    let interval

    const pollUserValidation = async () => {
      console.log("User's document validation poller running")

      try {
        const userData = await getUser().unwrap()

        if (userData.documentValidation !== 'pending') {
          console.log("User's document validation has been completed")
          dispatch(setUser(userData))
          clearInterval(interval)
        }
      } catch (error) {
        console.error('Error polling backend:', error)
      }
    }

    if (isFocused) interval = setInterval(pollUserValidation, 15000)

    return () => interval && clearInterval(interval)
  }, [getUser, dispatch, isFocused])
}
