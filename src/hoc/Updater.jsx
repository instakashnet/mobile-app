import UpdateModal from '@/components/modals/UpdateModal'
import { useAppUpdate } from '@/hooks/useAppUpdate'

function Updater({ children }) {
  const { isUpdateAvailable, updateType, handleUpdate, handleCancelUpdate } = useAppUpdate()

  return (
    <>
      {children}
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

export default Updater
