import { useRefresh } from '@/hooks/useRefresh'
import LoadingScreen from '@/screens/LoadingScreen'
import MainNavigator from '@/navigators/MainNavigator'
import { useAppVersion } from './hooks/updates/useAppVersion'
import UpdateModal from './components/modals/UpdateModal'

function Main({ onLayout }) {
  const { handleUpdate, handleCancelUpdate, isNewVersion } = useAppVersion()
  const { isSessionLoading } = useRefresh()

  if (isSessionLoading) return <LoadingScreen />

  return (
    <>
      <MainNavigator onLayout={onLayout} />
      <UpdateModal isAvailable={isNewVersion} onUpdate={handleUpdate} onCancel={handleCancelUpdate} />
    </>
  )
}

export default Main
