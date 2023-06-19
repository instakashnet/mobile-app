import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ConfigMenuScreen from '../screens/configuration/ConfigMenuScreen'
import ProfilesScreen from '../screens/configuration/ProfilesScreen'
import { TitleHeader } from './options'
import PersonalInfoScreen from '../screens/configuration/PersonalInfoScreen'
import ChangePasswordScreen from '../screens/configuration/ChangePasswordScreen'
import NotificationsScreen from '../screens/configuration/NotificationsScreen'
import AddProfileScreen from '../screens/configuration/AddProfileScreen'
import RatesAlertsScreen from '../screens/configuration/RatesAlertsScreen'

const Stack = createNativeStackNavigator()

export default function ConfigurationNavigator() {
  return (
    <Stack.Navigator screenOptions={{ header: (props) => <TitleHeader {...props} /> }}>
      <Stack.Screen name='ConfigMenu' options={{ title: 'Configuración' }} component={ConfigMenuScreen} />
      <Stack.Screen name='PersonalInfo' options={{ title: 'Información personal' }} component={PersonalInfoScreen} />
      <Stack.Screen name='Security' options={{ title: 'Seguridad' }} component={ChangePasswordScreen} />
      <Stack.Screen name='Notifications' options={{ title: 'Notificaciones' }} component={NotificationsScreen} />
      <Stack.Screen name='RatesAlerts' options={{ title: 'Alertas tipo de cambio' }} component={RatesAlertsScreen} />
      <Stack.Screen name='Profiles' options={{ title: 'Mis perfiles' }} component={ProfilesScreen} />
      <Stack.Screen name='AddProfile' options={{ title: 'Agregar perfil' }} component={AddProfileScreen} />
    </Stack.Navigator>
  )
}
