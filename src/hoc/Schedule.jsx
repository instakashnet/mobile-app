import { Modal, Portal, Text } from 'react-native-paper'
import { useState } from 'react'

import { useSchedule } from '../hooks/useSchedule'
import Button from '../components/UI/Button'
import { useUpdate } from '../hooks/useUpdate'

export default function ScheduleInfo({ children }) {
  const [showModal, setShowModal] = useState(false)
  const { schedule } = useSchedule()

  useUpdate(() => {
    if (schedule?.status === 'closed') setShowModal(true)
  }, [schedule?.status])

  const handleCloseModal = () => setShowModal(false)

  return (
    <>
      {children}
      <Portal>
        <Modal
          visible={showModal}
          dismissable={false}
          contentContainerStyle={{ backgroundColor: '#fff', padding: 30, borderRadius: 8 }}
          style={{ marginHorizontal: 40 }}>
          <Text variant="titleLarge" className="text-center">
            Fuera de horario
          </Text>
          <Text className="mt-2 text-center leading-5">
            Has ingresado fuera de nuestro horario laboral, todo pedido registrado en este momento será procesado a partir del siguiente día
            útil.
          </Text>
          <Text variant="button" className="text-center mt-4">
            Horario de hoy: {schedule?.timeRange}
          </Text>
          <Button className="mt-6" onPress={handleCloseModal}>
            Aceptar
          </Button>
        </Modal>
      </Portal>
    </>
  )
}
