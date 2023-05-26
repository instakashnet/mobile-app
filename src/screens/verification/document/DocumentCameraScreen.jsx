import { View, Text } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import React, { useEffect } from 'react'

export default function DocumentCameraScreen() {
  useEffect(() => {
    const getCameraPermissions = async () => {
      try {
        const newCameraPermission = await Camera.requestCameraPermission()

        console.log(newCameraPermission)
      } catch (error) {
        console.log(error)
      }
    }

    getCameraPermissions()
  }, [])

  return (
    <View className='flex-1 items-center justify-center'>
      <Text>DocumentCameraScreen</Text>
    </View>
  )
}
