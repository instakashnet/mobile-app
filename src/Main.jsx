import { useRefresh } from '@/hooks/useRefresh'
import LoadingScreen from '@/screens/LoadingScreen'
import MainNavigator from '@/navigators/MainNavigator'
import { useAppUpdate } from './hooks/useAppUpdate'
import UpdateModal from './components/modals/UpdateModal'

function Main({ onLayout }) {
  const { updateType, handleUpdate, handleCancelUpdate, isUpdateAvailable } = useAppUpdate()
  const { isSessionLoading } = useRefresh()

  if (isSessionLoading) return <LoadingScreen />

  return (
    <>
      <MainNavigator onLayout={onLayout} />
      <UpdateModal
        isAvailable={isUpdateAvailable}
        onUpdate={handleUpdate}
        onCancel={handleCancelUpdate}
        type={updateType}
        title={updateType === 'minor' ? 'Actualización disponible' : 'Nueva versión disponible'}
      />
    </>
  )
}

export default Main
