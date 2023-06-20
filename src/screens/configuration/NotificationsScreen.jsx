import { Text } from 'react-native-paper'
import Container from '../../components/utils/Container'
import { Linking, Pressable, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import NotificationItem from '../../components/configuration/NotificationItem'
import { useNotifications } from '../../hooks/useNotifications'

function NotificationsScreen({ navigation }) {
  const { permissionStatus } = useNotifications()

  const openNotificationSettings = async () => {
    // Check if the Linking module is supported on the current device
    const isSupported = await Linking.canOpenURL('app-settings:')

    if (isSupported) {
      // Open the device's settings page directly to the app settings
      await Linking.openSettings()
    }
  }

  return (
    <Container>
      <Text>Gestiona tus notificaciones y selecciona aquellas que deseas recibir</Text>
      <Pressable className='flex-row items-center justify-between mt-10' onPress={openNotificationSettings}>
        <Text variant='titleSmall'>Notificaciones generales</Text>
        <Ionicons name='chevron-forward-outline' size={24} color='black' />
      </Pressable>
      {permissionStatus === 'granted' && (
        <>
          <View className='mt-20' />
          <NotificationItem label='Estado de operaciones' />
          <View className='mt-8' />
          <NotificationItem label='KASH ganados' />
          <View className='mt-8' />
          <NotificationItem label='Avisos y promociones' />
          <View className='my-8 border-b border-gray-400 w-full' />
          <Pressable className='flex-row items-center justify-between' onPress={() => navigation.navigate('RatesAlerts')}>
            <Text variant='titleSmall'>Alertas de tipo de cambio</Text>
            <Ionicons name='chevron-forward-outline' size={24} color='black' />
          </Pressable>
        </>
      )}
    </Container>
  )
}

export default NotificationsScreen
