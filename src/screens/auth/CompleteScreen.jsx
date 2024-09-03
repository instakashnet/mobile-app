import React from 'react'
import { View } from 'react-native'

import CompleteForm from '../../components/auth/CompleteForm'
import Button from '../../components/UI/Button'
import Screen from '../../components/utils/Screen'
import Text from '@/components/utils/Text'

export default function CompleteScreen({ navigation }) {
  return (
    <Screen>
      <Text variant="titleLarge">Completa tu perfil</Text>
      <View className="mt-6">
        <CompleteForm />
      </View>
      <Button variant="secondary" className="mt-4" onPress={() => navigation.replace('Login')}>
        Volver al inicio
      </Button>
    </Screen>
  )
}
