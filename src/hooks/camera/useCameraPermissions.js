import { useCallback, useEffect } from 'react'
import { Camera } from 'expo-camera'

export function useCameraPermissions() {
  const [permission, requestPermission] = Camera.useCameraPermissions()

  const requestCameraPermissions = useCallback(async () => {
    try {
      await requestPermission()
    } catch (error) {
      console.log(error)
    }
  }, [requestPermission])

  useEffect(() => {
    if (!permission?.granted && permission?.canAskAgain) requestCameraPermissions()
  }, [permission, requestCameraPermissions])

  return { permission, requestPermission: requestCameraPermissions }
}
