import { nativeApplicationVersion } from 'expo-application'
import * as Updates from 'expo-updates'
import { useCallback, useEffect, useState } from 'react'
import { Linking, Platform } from 'react-native'
import semver from 'semver'
import { APP_VERSION } from '@/constants/APP_VERSION'

const INTERVAL_OTA_CHECK = 1000 * 60 * (__DEV__ ? 1 : 60) * 24

export function useAppUpdate() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  const [updateType, setUpdateType] = useState(null)

  const checkForUpdates = useCallback(async () => {
    try {
      if (__DEV__) return
      if (isUpdateAvailable) return

      const update = await Updates.checkForUpdateAsync()
      if (update.isAvailable) {
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
  }, [isUpdateAvailable])

  useEffect(() => {
    const checkUpdatesInterval = setInterval(checkForUpdates, INTERVAL_OTA_CHECK)

    checkForUpdates()

    return () => clearInterval(checkUpdatesInterval)
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
    setIsUpdateAvailable(false)
    setUpdateType(null)
  }

  return { isUpdateAvailable, updateType, handleUpdate, handleCancelUpdate }
}
