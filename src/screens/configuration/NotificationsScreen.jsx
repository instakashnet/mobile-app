import { Pressable, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Container from '../../components/utils/Container'
import NotificationItem from '../../components/configuration/NotificationItem'
import { useNotificationsPermissions } from '../../hooks/notifications/useNotificationsPermissions'
import { useNotifications } from '../../hooks/notifications/useNotifications'
import { useAppStateChange } from '../../hooks/useAppStateChange'
import { openAppSetting } from '../../utils/handlers'
import Text from '@/components/utils/Text'

function NotificationsScreen({ navigation }) {
  const { permissionStatus, getPermissions } = useNotificationsPermissions()
  const { notifications, saveNotification } = useNotifications(permissionStatus)
  useAppStateChange(getPermissions)

  const handleChangeNotif = (type, enabled) => saveNotification({ type, enabled })

  return (
    <Container>
      <Text>Gestiona tus notificaciones y selecciona aquellas que deseas recibir</Text>
      <Pressable className="flex-row items-center justify-between mt-10" onPress={openAppSetting}>
        <Text variant="titleSmall">Notificaciones generales</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
      </Pressable>
      {permissionStatus === 'granted' && (
        <>
          <View className="mt-20" />
          <NotificationItem
            label="Estado de operaciones"
            name="statusChanged"
            onChange={handleChangeNotif}
            value={notifications.find(n => n.type === 'statusChanged')?.enabled}
          />
          <View className="mt-8" />
          <NotificationItem
            label="KASH ganados"
            name="kash"
            onChange={handleChangeNotif}
            value={notifications.find(n => n.type === 'kash')?.enabled}
          />
          <View className="mt-8" />
          <NotificationItem
            label="Avisos y promociones"
            name="promotions"
            onChange={handleChangeNotif}
            value={notifications.find(n => n.type === 'promotions')?.enabled}
          />
          <View className="my-8 border-b border-gray-400 w-full" />
          <Pressable className="flex-row items-center justify-between" onPress={() => navigation.navigate('RatesAlerts')}>
            <Text variant="titleSmall">Alertas de tipo de cambio</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </Pressable>
        </>
      )}
    </Container>
  )
}

export default NotificationsScreen
