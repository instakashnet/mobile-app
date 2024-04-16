import { useRefresh } from '@/hooks/useRefresh'
import LoadingScreen from '@/screens/LoadingScreen'
import MainNavigator from '@/navigators/MainNavigator'
import { useAppStateChange } from './hooks/useAppStateChange'
import { checkUpdates } from './helpers/check-updates'

function Main() {
  useAppStateChange(checkUpdates)
  const { isSessionLoading } = useRefresh()

  if (isSessionLoading) return <LoadingScreen />

  return (
    <>
      <MainNavigator />
    </>
  )
}

export default Main
