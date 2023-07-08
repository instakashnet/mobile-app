import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { useLazyGetUserQuery } from '../services/user'
import { setUser } from '../store/slices/authSlice'

export function usePollverificiation() {
  const [getUser] = useLazyGetUserQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    let interval

    const pollUserValidation = async () => {
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

    interval = setInterval(pollUserValidation, 15000)

    return () => interval && clearInterval(interval)
  }, [getUser, dispatch])
}
