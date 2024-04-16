import { NavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'

import ScheduleModal from '@/components/modals/ScheduleModal'
import DrawerNavigator from './DrawerNavigator'
import AuthNavigator from './unauthenticated/AuthNavigator'
import { useMainNavigatorLogic } from './MainNavigator.logic'
import { theme } from '@/theme/navigation/theme'
import { useAccountsData } from '@/hooks/useAccountsData'

export default function MainNavigator() {
  const { isSignedIn } = useMainNavigatorLogic()
  useAccountsData(isSignedIn)

  return (
    <NavigationContainer
      theme={theme}
      onReady={() => {
        SplashScreen.hideAsync()
      }}>
      {!isSignedIn ? (
        <AuthNavigator />
      ) : (
        <>
          <DrawerNavigator />
          <ScheduleModal />
        </>
      )}
    </NavigationContainer>
  )
}
