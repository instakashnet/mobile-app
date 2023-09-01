import { nativeApplicationVersion } from 'expo-application'
import semver from 'semver'
import { Linking, Platform } from 'react-native'
import * as Updates from 'expo-updates'
import { useCallback, useEffect, useState } from 'react'

import { APP_VERSION } from '@/constants/APP_VERSION'

export function useAppUpdate() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  const [updateType, setUpdateType] = useState(null)

  const checkForUpdates = useCallback(async () => {
    try {
      if (isUpdateAvailable) {
        setIsUpdateAvailable(false)
        return
      }

      // const update = await Updates.checkForUpdateAsync()
      if (!true) {
        await Updates.fetchUpdateAsync()
        setUpdateType('minor')
        setIsUpdateAvailable(true)
      } else {
        if (semver.gt(APP_VERSION, nativeApplicationVersion)) {
          setUpdateType('major')
          setIsUpdateAvailable(true)
        }
      }
    } catch (error) {
      console.error('Failed to check for updates:', error)
    }
  }, [])

  useEffect(() => {
    checkForUpdates()
  }, [checkForUpdates])

  const handleUpdate = async () => {
    try {
      if (updateType === 'minor') {
        await Updates.reloadAsync()
      } else {
        await Linking.openURL(
          Platform.OS === 'android'
            ? 'https://play.google.com/store/apps/details?id=net.instakash.app'
            : 'https://apps.apple.com/pe/app/instakash/id1601561803',
        )
      }
    } catch (error) {
      console.error('Failed to fetch or reload update:', error)
    }
  }

  const handleCancelUpdate = () => {
    console.log('handleCancelUpdate')
    setIsUpdateAvailable(false)
    setUpdateType(null)
  }

  return { isUpdateAvailable, updateType, handleUpdate, handleCancelUpdate }
}
