import * as Updates from 'expo-updates'
import { nativeApplicationVersion } from 'expo-application'
import semver from 'semver'
import { useEffect, useState } from 'react'
import { Linking, Platform } from 'react-native'

const APP_VERSION = '1.1.0'

export function useAppUpdate() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  const [updateType, setUpdateType] = useState(null)

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        if (__DEV__) return

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
    }

    checkForUpdates()
  }, [])

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
