import { View } from 'react-native'
import React from 'react'
import Container from '../../components/utils/Container'
import { Feather } from '@expo/vector-icons'
import { Text, useTheme } from 'react-native-paper'
import Button from '../../components/UI/Button'

export default function SuccessScreen({ navigation }) {
  const { colors } = useTheme()

  return (
    <Container>
      <View className='flex-1 items-center justify-center'>
        <Feather name='check-circle' size={40} color={colors.primary700} />
        <Text className='mt-4' variant='titleLarge'>
          Tu cambio está en proceso!
        </Text>
        <View className='mt-4' />
        <Text>
          Los cambios se procesan <Text variant='button'>entre 10 a 30 minutos</Text> en horario laboral. Si te encuentras fuera de nuestro
          horario laboral, tendrás que esperar al próximo día hábil.
        </Text>
      </View>
      <View className='mt-auto' />
      <Button
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Operations' }]
          })
        }
      >
        Ver mis cambios
      </Button>
    </Container>
  )
}
