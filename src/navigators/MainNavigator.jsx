import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { adaptNavigationTheme } from 'react-native-paper'

import ScheduleModal from '@/components/modals/ScheduleModal'
import DrawerNavigator from './DrawerNavigator'
import AuthNavigator from './unauthenticated/AuthNavigator'
import { useMainNavigatorLogic } from './MainNavigator.logic'

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
})

export default function MainNavigator({ onLayout }) {
  const { isSignedIn } = useMainNavigatorLogic()

  return (
    <NavigationContainer theme={LightTheme} onReady={onLayout}>
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
