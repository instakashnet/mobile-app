import * as Notifications from 'expo-notifications'
import { useEffect } from 'react'

export function useNotificationHandlers(notificationHandler, interactionHandler) {
  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(notificationHandler)
    const interactionListener = Notifications.addNotificationResponseReceivedListener(interactionHandler)

    return () => {
      Notifications.removeNotificationSubscription(notificationListener)
      Notifications.removeNotificationSubscription(interactionListener)
    }
  }, [notificationHandler, interactionHandler])
}
