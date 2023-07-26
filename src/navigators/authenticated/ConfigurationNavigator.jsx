import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AddProfileScreen from '@/screens/configuration/AddProfile/AddProfileScreen'
import ChangePasswordScreen from '@/screens/configuration/ChangePasswordScreen'
import ConfigMenuScreen from '@/screens/configuration/ConfigMenuScreen'
import NotificationsScreen from '@/screens/configuration/NotificationsScreen'
import PersonalInfoScreen from '@/screens/configuration/PersonalInfoScreen'
import ProfilesScreen from '@/screens/configuration/ProfilesScreen'
import RatesAlertsScreen from '@/screens/configuration/RatesAlertsScreen'
import { TitleHeader } from '../options'

const Stack = createNativeStackNavigator()

export default function ConfigurationNavigator() {
  return (
    <Stack.Navigator screenOptions={{ header: props => <TitleHeader {...props} /> }}>
      <Stack.Screen name="ConfigMenu" options={{ title: 'Configuración' }} component={ConfigMenuScreen} />
      <Stack.Screen name="PersonalInfo" options={{ title: 'Información personal' }} component={PersonalInfoScreen} />
      <Stack.Screen name="Security" options={{ title: 'Seguridad' }} component={ChangePasswordScreen} />
      <Stack.Screen name="Notifications" options={{ title: 'Notificaciones' }} component={NotificationsScreen} />
      <Stack.Screen name="RatesAlerts" options={{ title: 'Alertas tipo de cambio' }} component={RatesAlertsScreen} />
      <Stack.Screen name="Profiles" options={{ title: 'Mis perfiles' }} component={ProfilesScreen} />
      <Stack.Screen name="AddProfile" options={{ title: 'Agregar perfil' }} component={AddProfileScreen} />
    </Stack.Navigator>
  )
}
