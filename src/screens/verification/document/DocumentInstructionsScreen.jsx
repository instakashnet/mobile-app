import React from 'react'
import SafeArea from '../../../components/utils/SafeArea'
import Container from '../../../components/utils/Container'
import StepsBar from '../../../components/utils/StepsBar'
import { steps } from '../../../utils/verification-steps'
import { Text, useTheme } from 'react-native-paper'
import { View } from 'react-native'
import Card from '../../../components/UI/Card'
import { FontAwesome } from '@expo/vector-icons'
import Button from '../../../components/UI/Button'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../store/slices/authSlice'

export default function DocumentInstructionsScreen({ navigation }) {
  const { colors } = useTheme()
  const user = useSelector(selectUser)

  return (
    <SafeArea>
      <Container>
        <View className='mt-3' />
        <StepsBar activeStep={3} steps={steps} />
        <Text className='mt-4 text-gray-500'>
          Toma una foto de tu documento. Recuerda que debe estar vigente y a tu nombre para ser validado correctamente.
        </Text>
        <View className='mt-10' />
        <Text variant='button' className='text-gray-500'>
          ¡Importante!
        </Text>
        <View className='mt-2' />
        <Card classes={['flex-row', 'items-center']}>
          <FontAwesome name='id-card-o' color={colors.primary700} size={25} />
          <Text variant='bodySmall' className='flex-wrap flex-1 ml-3'>
            La foto debe estar nítida y ser completamente legible.
          </Text>
        </Card>
        <View className='mt-4' />
        <Card classes={['flex-row', 'items-center']}>
          <FontAwesome name='lightbulb-o' color={colors.primary700} size={30} />
          <Text variant='bodySmall' className='flex-wrap flex-1 ml-3'>
            Verifica que hay buena iluminación en tu entorno.
          </Text>
        </Card>
        <View className='mt-4' />
        <Card classes={['flex-row', 'items-center']}>
          <FontAwesome name='square-o' color={colors.primary700} size={30} />
          <Text variant='bodySmall' className='flex-wrap flex-1 ml-3'>
            Recuerda ajustar el documento dentro del marco mostrado.
          </Text>
        </Card>
        <View className='mt-auto' />
        <Button onPress={() => navigation.navigate('DocumentCamera', { documentType: user.documentType })}>Tomar foto</Button>
      </Container>
    </SafeArea>
  )
}
