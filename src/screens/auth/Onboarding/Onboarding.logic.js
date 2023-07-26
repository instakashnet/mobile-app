import { useNavigation } from '@react-navigation/core'
import { useEffect } from 'react'

import { getData, storeData } from '../../../lib/AsyncStorage'

export function useOnboarding() {
  const { navigate } = useNavigation()

  useEffect(() => {
    const checkFirstTime = async () => {
      const firstTime = await getData('firstTime')
      if (firstTime) return navigate('Login')

      await storeData('firstTime', true)
    }

    checkFirstTime()
  }, [navigate])

  const signUp = () => navigate('Register')
  const login = () => navigate('Login')

  return {
    signUp,
    login,
  }
}
