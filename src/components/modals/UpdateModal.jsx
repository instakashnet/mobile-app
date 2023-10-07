import React from 'react'

import Modal from './Modal'
import Text from '../utils/Text'

export default function UpdateModal({ isAvailable, onCancel, onUpdate }) {
  return (
    <Modal
      visible={isAvailable}
      onDismiss={onCancel}
      title="Nueva versión disponible"
      actionButtons={[
        {
          label: 'Descargar',
          onPress: onUpdate,
          variant: 'primary',
        },
      ]}>
      <Text className="text-center">Hay una nueva versión disponible. Te recomendamos actualizar para obtener las nuevas mejoras.</Text>
    </Modal>
  )
}
