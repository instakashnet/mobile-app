import { getTrackingPermissionsAsync, PermissionStatus, requestTrackingPermissionsAsync } from 'expo-tracking-transparency'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'

export function useTrackingTransparency() {
  const [permissionStatus, setPermissionStatus] = useState(null)

  useEffect(() => {
    if (Platform.OS === 'ios') requestPermission()
  }, [])

  const requestPermission = async () => {
    try {
      const { status } = await getTrackingPermissionsAsync()

      // If the permission is already granted or denied, return the status.
      if (status === PermissionStatus.GRANTED || status === PermissionStatus.DENIED) {
        setPermissionStatus(status)
      } else {
        // If the permission is not determined yet, request the user for permission.
        const { status: newStatus } = await requestTrackingPermissionsAsync()
        setPermissionStatus(newStatus)
      }
    } catch (error) {
      console.log('Error requesting tracking permission:', error)
    }
  }

  return permissionStatus
}
