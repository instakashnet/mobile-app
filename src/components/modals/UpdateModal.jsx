import React from 'react'
import { Text } from 'react-native-paper'

import { useAppUpdate } from '../../hooks/useAppUpdate'
import Modal from './Modal'

export default function UpdateModal() {
  const { isUpdateAvailable, updateType, handleUpdate, handleCancelUpdate } = useAppUpdate()

  return (
    isUpdateAvailable && (
      <Modal
        visible={isUpdateAvailable}
        onDismiss={handleCancelUpdate}
        title={updateType === 'minor' ? 'Actualización disponible' : 'Nueva versión disponible'}
        actionButtons={[
          {
            label: 'Actualizar',
            onPress: handleUpdate,
            variant: 'primary',
          },
        ]}>
        <Text className="text-center">
          Hay una {updateType === 'minor' ? 'actualización' : 'nueva versión'} disponible. Te recomendamos actualizar para obtener las
          nuevas mejoras.
        </Text>
      </Modal>
    )
  )
}
