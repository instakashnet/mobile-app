import { View } from 'react-native'
import React from 'react'
import SafeArea from '../../components/utils/SafeArea'
import { Text } from 'react-native-paper'
import CompleteForm from '../../components/auth/CompleteForm'
import Button from '../../components/UI/Button'

export default function CompleteScreen({ navigation }) {
  return (
    <SafeArea>
      <View className='flex-1 justify-center mt-2 px-6 pb-6'>
        <Text variant='titleLarge'>¡Continuemos!</Text>
        <Text className='mt-2'>Para continuar debes completar tus datos como figura en tu documento.</Text>
        <CompleteForm />
        <Button variant='secondary' className='mt-4' onPress={() => navigation.replace('Login')}>
          Volver al inicio
        </Button>
      </View>
    </SafeArea>
  )
}
