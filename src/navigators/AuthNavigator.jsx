import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from 'react-native-paper'

import CompleteScreen from '../screens/auth/CompleteScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import OnboardingScreen from '../screens/auth/Onboarding/OnboardingScreen'
import RecoverPasswordScreen from '../screens/auth/RecoverPasswordScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen'
import VerifyCodeScreen from '../screens/auth/VerifyCodeScreen'
import { TitleHeader } from './options'

const Stack = createNativeStackNavigator()

export default function AuthNavigator() {
  const { colors } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.white300,
        },
        header: props => <TitleHeader {...props} />,
      }}>
      <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Register" options={{ headerTitle: 'Registrarse' }} component={RegisterScreen} />
      <Stack.Screen name="Login" options={{ headerTitle: 'Iniciar sesión', headerBackTitleVisible: false }} component={LoginScreen} />
      <Stack.Screen name="VerifyCode" options={{ headerTitle: 'Verificación', headerLeft: null }} component={VerifyCodeScreen} />
      <Stack.Screen name="RecoverPassword" options={{ headerTitle: 'Reiniciar contraseña' }} component={RecoverPasswordScreen} />
      <Stack.Screen
        name="ResetPassword"
        options={{ headerTitle: 'Reiniciar contraseña', headerLeft: null }}
        component={ResetPasswordScreen}
      />
      <Stack.Screen name="Complete" options={{ headerTitle: 'Completar perfil', headerLeft: null }} component={CompleteScreen} />
    </Stack.Navigator>
  )
}
