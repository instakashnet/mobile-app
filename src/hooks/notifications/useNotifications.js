import { useCallback, useEffect, useState } from 'react'

import { useGetNotificationsQuery, useSaveNotificationMutation } from '../../services/notifications'
import { getData, storeData } from '../../lib/AsyncStorage'

export function useNotifications(permissionStatus) {
  const [notifications, setNotifications] = useState([])
  const { data = [], isFetching } = useGetNotificationsQuery('notifications', { skip: permissionStatus !== 'granted' })
  const [saveUserNotification] = useSaveNotificationMutation()

  const getLocalNotifications = useCallback(async () => {
    try {
      const localNotifications = await getData('notifications')

      if (!localNotifications) {
        await storeData('notifications', data)
        setNotifications(data)
      } else {
        setNotifications(localNotifications)
      }
    } catch (error) {
      console.log(error)
    }
  }, [data])

  const saveNotification = async notification => {
    try {
      const newNotifications = notifications.map(item => {
        if (item.type === notification.type) {
          return notification
        }
        return item
      })
      setNotifications(newNotifications)

      await storeData('notifications', newNotifications)
      await saveUserNotification(notification).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (permissionStatus === 'granted') getLocalNotifications()
  }, [permissionStatus, getLocalNotifications])

  return { notifications, saveNotification, isFetching }
}
