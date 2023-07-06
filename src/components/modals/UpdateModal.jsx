import React from 'react'
import { Modal, Portal, Text } from 'react-native-paper'
import { View } from 'react-native'

import { useAppUpdate } from '../../hooks/useAppUpdate'
import Button from '../UI/Button'

export default function UpdateModal() {
  const { isUpdateAvailable, updateType, handleUpdate, handleCancelUpdate } = useAppUpdate()

  return (
    isUpdateAvailable && (
      <Portal>
        <Modal
          visible={isUpdateAvailable}
          onDismiss={handleCancelUpdate}
          className="px-8"
          contentContainerStyle={{ borderRadius: 12, backgroundColor: '#fff', paddingHorizontal: 24, paddingVertical: 36 }}>
          <Text variant="title" className="text-center">
            {updateType === 'minor' ? 'Actualización disponible' : 'Nueva versión disponible'}
          </Text>
          <View className="mt-2" />
          <Text className="text-center">
            Hay una {updateType === 'minor' ? 'actualización' : 'nueva versión'} disponible. Te recomendamos actualizar para obtener las
            nuevas mejoras.
          </Text>
          <View className="mt-6" />
          <Button onPress={handleUpdate}>Actualizar</Button>
        </Modal>
      </Portal>
    )
  )
}
