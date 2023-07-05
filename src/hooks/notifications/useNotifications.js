import { useCallback, useEffect, useState } from 'react'

import { useLazyGetNotificationsQuery, useSaveNotificationMutation } from '../../services/notifications'
import { storeData } from '../../lib/AsyncStorage'

export function useNotifications(permissionStatus) {
  const [notifications, setNotifications] = useState([])
  const [getNotifications, { isLoading }] = useLazyGetNotificationsQuery('notifications')
  const [saveUserNotification] = useSaveNotificationMutation()

  const getLocalNotifications = useCallback(async () => {
    try {
      // const localNotifications = await getData('notifications')

      // if (!localNotifications || localNotifications.length === 0) {
      const response = await getNotifications().unwrap()
      await storeData('notifications', response)
      setNotifications(response)
      // } else {
      //   setNotifications(localNotifications)
      // }
    } catch (error) {
      console.log(error)
    }
  }, [getNotifications])

  const saveNotification = async notification => {
    try {
      const newNotifications = notifications.map(item => {
        if (item.type === notification.type) {
          return notification
        }
        return item
      })
      setNotifications(newNotifications)

      await saveUserNotification(notification).unwrap()
      await storeData('notifications', newNotifications)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (permissionStatus === 'granted') getLocalNotifications()
  }, [permissionStatus, getLocalNotifications])

  return { notifications, saveNotification, isLoading }
}
