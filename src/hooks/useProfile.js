import { useEffect, useState } from 'react'
import { getData, storeData } from '../lib/AsyncStorage'

export function useProfile() {
  const [profile, setProfile] = useState(null)

  const storeProfile = async (profileValue) => {
    await storeData('profile', profileValue)
  }

  useEffect(() => {
    const getProfile = async () => {
      const data = await getData('profile')
      if (data) setProfile(data)
    }

    getProfile()
  }, [])

  return { profile, storeProfile }
}
