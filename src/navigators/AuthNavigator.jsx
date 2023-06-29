import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from 'react-native-paper'

import OnboardingScreen from '../screens/auth/OnboardingScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import { TitleHeader } from './options'
import VerifyCodeScreen from '../screens/auth/VerifyCodeScreen'
import CompleteScreen from '../screens/auth/CompleteScreen'
import RecoverPasswordScreen from '../screens/auth/RecoverPasswordScreen'
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen'

const Stack = createNativeStackNavigator()

export default function AuthNavigator() {
  const { colors, fonts } = useTheme()

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
      <Stack.Screen name="Complete" options={{ headerTitle: 'Completar registro' }} component={CompleteScreen} />
    </Stack.Navigator>
  )
}
