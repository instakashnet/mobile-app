import { useRefresh } from '@/hooks/useRefresh'
import LoadingScreen from '@/screens/LoadingScreen'
import MainNavigator from '@/navigators/MainNavigator'
import { useAppVersion } from './hooks/updates/useAppVersion'
import UpdateModal from './components/modals/UpdateModal'
import { useAppStateChange } from './hooks/useAppStateChange'
import { checkUpdates } from './helpers/check-updates'

function Main() {
  const { handleUpdate, handleCancelUpdate, isNewVersion } = useAppVersion()
  useAppStateChange(checkUpdates)
  const { isSessionLoading } = useRefresh()

  if (isSessionLoading) return <LoadingScreen />

  return (
    <>
      <MainNavigator />
      <UpdateModal isAvailable={isNewVersion} onUpdate={handleUpdate} onCancel={handleCancelUpdate} />
    </>
  )
}

export default Main
