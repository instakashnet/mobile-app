import { useState } from 'react'
import { Text } from 'react-native-paper'

import { useSchedule } from '../../hooks/useSchedule'
import { useUpdate } from '../../hooks/useUpdate'
import Modal from './Modal'

function ScheduleModal() {
  const [showModal, setShowModal] = useState(false)
  const { schedule } = useSchedule()

  useUpdate(() => {
    if (schedule?.status === 'closed') setShowModal(true)
  }, [schedule?.status])

  const handleCloseModal = () => setShowModal(false)

  return (
    <Modal
      visible={showModal}
      onDismiss={handleCloseModal}
      title="Fuera de horario"
      actionButtons={[
        {
          label: 'Aceptar',
          onPress: handleCloseModal,
          variant: 'primary',
        },
      ]}>
      <Text className="text-center leading-5">
        Has ingresado fuera de nuestro horario laboral, todo pedido registrado en este momento será procesado a partir del siguiente día
        útil.
      </Text>
      <Text variant="button" className="text-center mt-4">
        Horario de hoy: {schedule?.timeRange}
      </Text>
    </Modal>
  )
}

export default ScheduleModal
