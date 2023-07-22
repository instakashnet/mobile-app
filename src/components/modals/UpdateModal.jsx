import React from 'react'
import { Text } from 'react-native-paper'

import Modal from './Modal'

export default function UpdateModal({ isAvailable, onCancel, title, type, onUpdate }) {
  return (
    <Modal
      visible={isAvailable}
      onDismiss={onCancel}
      title={title}
      actionButtons={[
        {
          label: 'Actualizar',
          onPress: onUpdate,
          variant: 'primary',
        },
      ]}>
      <Text className="text-center">
        Hay una {type === 'minor' ? 'actualización' : 'nueva versión'} disponible. Te recomendamos actualizar para obtener las nuevas
        mejoras.
      </Text>
    </Modal>
  )
}
