import React from 'react'

import CompleteForm from '../../components/auth/CompleteForm'
import Button from '../../components/UI/Button'
import Screen from '../../components/utils/Screen'
import Text from '@/components/utils/Text'

export default function CompleteScreen({ navigation }) {
  return (
    <Screen>
      <Text variant="titleLarge">Completa tu perfil</Text>
      <CompleteForm />
      <Button variant="secondary" className="mt-4" onPress={() => navigation.replace('Login')}>
        Volver al inicio
      </Button>
    </Screen>
  )
}
