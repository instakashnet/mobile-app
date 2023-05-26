import React from 'react'
import { Snackbar, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { clearAlert, selectAlerts } from '../../store/slices/alert'
import { Dimensions } from 'react-native'

const TYPES = {
  error: {
    backgroundColor: '#FF4B55'
  },
  success: {
    backgroundColor: '#0d8284'
  }
}

export default function Alert() {
  const alerts = useSelector(selectAlerts)
  const dispatch = useDispatch()

  const onRemove = (id) => dispatch(clearAlert(id))

  return alerts.map(({ visible, id, message, type }) => {
    const typeStyles = TYPES[type]

    return (
      <Snackbar
        elevation={4}
        key={id}
        visible={visible}
        duration={Snackbar.DURATION_MEDIUM}
        onDismiss={() => onRemove(id)}
        action={{
          label: 'CERRAR',
          labelStyle: {
            color: '#fff'
          },
          onPress: () => onRemove(id)
        }}
        style={[typeStyles, { width: Dimensions.get('window').width / 1.05 }]}
      >
        <Text style={{ color: '#fff' }}>{message}</Text>
      </Snackbar>
    )
  })
}
