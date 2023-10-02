import { NavigationContainer } from '@react-navigation/native'

import ScheduleModal from '@/components/modals/ScheduleModal'
import DrawerNavigator from './DrawerNavigator'
import AuthNavigator from './unauthenticated/AuthNavigator'
import { useMainNavigatorLogic } from './MainNavigator.logic'
import { theme } from '@/theme/navigation/theme'

export default function MainNavigator({ onLayout }) {
  const { isSignedIn } = useMainNavigatorLogic()

  return (
    <NavigationContainer theme={theme} onReady={onLayout}>
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
