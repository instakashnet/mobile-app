import { nativeApplicationVersion } from 'expo-application'
import semver from 'semver'
import { Linking, Platform } from 'react-native'
import { useEffect, useState } from 'react'

import { APP_VERSION } from '@/constants/APP_VERSION'

export function useAppVersion() {
  const [isNewVersion, setIsNewVersion] = useState(false)

  useEffect(() => {
    if (semver.gt(APP_VERSION, nativeApplicationVersion)) {
      setIsNewVersion(true)
    }
  }, [])

  const handleUpdate = async () => {
    try {
      await Linking.openURL(
        Platform.OS === 'android'
          ? 'https://play.google.com/store/apps/details?id=net.instakash.app'
          : 'https://apps.apple.com/pe/app/instakash/id1601561803',
      )
    } catch (error) {
      console.error('Failed to fetch or reload update:', error)
    }
  }

  const handleCancelUpdate = () => {
    setIsNewVersion(false)
  }

  return { isNewVersion, handleUpdate, handleCancelUpdate }
}
