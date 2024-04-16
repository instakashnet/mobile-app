import React from 'react'

import Modal from './Modal'
import Text from '../utils/Text'
import { useAppVersion } from '@/hooks/updates/useAppVersion'

export default function UpdateModal() {
  const { handleUpdate, handleCancelUpdate, isNewVersion } = useAppVersion()

  return (
    <Modal
      visible={isNewVersion}
      onDismiss={handleCancelUpdate}
      title="Nueva versión disponible"
      actionButtons={[
        {
          label: 'Descargar',
          onPress: handleUpdate,
          variant: 'primary',
        },
      ]}>
      <Text className="text-center">Hay una nueva versión disponible. Te recomendamos actualizar para obtener las nuevas mejoras.</Text>
    </Modal>
  )
}
