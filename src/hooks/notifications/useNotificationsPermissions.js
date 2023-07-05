import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export function useNotificationsPermissions() {
  const [permissionStatus, setPermissionStatus] = useState(null)

  const getPermissions = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      setPermissionStatus(finalStatus)
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#008284',
      })
    }
  }

  useEffect(() => {
    getPermissions()
  }, [])

  const getPushToken = async () => {
    let token

    try {
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: 'd79c74ef-7ba4-44fa-b647-92650d67b200',
        })
      ).data
      console.log({ token })
      return token
    } catch (error) {
      console.log(error)
    }
  }

  return { permissionStatus, getPermissions, getPushToken }
}
