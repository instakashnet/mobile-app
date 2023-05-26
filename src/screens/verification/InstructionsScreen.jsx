import { Pressable, View } from 'react-native'
import React, { useState } from 'react'
import SafeArea from '../../components/utils/SafeArea'
import { Checkbox, Text, useTheme } from 'react-native-paper'
import Container from '../../components/utils/Container'
import { Ionicons } from '@expo/vector-icons'
import Card from '../../components/UI/Card'
import InfoStep from '../../components/verification/InfoStep'
import Button from '../../components/UI/Button'
import { selectUser } from '../../store/slices/authSlice'
import { useSelector } from 'react-redux'

export default function InstructionsScreen({ navigation }) {
  const { colors } = useTheme()
  const user = useSelector(selectUser)
  const [accepted, setAccepted] = useState(false)

  console.log(user)

  const handleBegin = () => {
    if (user?.validationLevel === 0) return navigation.navigate('Address')
    else if (user?.validationLevel === 1) return navigation.navigate('Occupation')
    else if (user?.validationLevel === 2) return navigation.navigate('Document')
  }

  return (
    <SafeArea>
      <Container>
        <View className='flex-row items-center'>
          <Ionicons name='shield-checkmark-outline' color={colors.primary700} size={25} />
          <Text variant='titleLarge' className='ml-2'>
            Verifica tu cuenta
          </Text>
        </View>
        <Text className='mt-2'>
          Verifica tu cuenta para poder relizar tus cambios. Esto es necesario para protegerte contra el fraude y lavado de activos.
        </Text>
        <View className='mt-6' />
        <Text variant='button' className='text-gray-500'>
          ¿Que necesitas?
        </Text>
        <Card>
          <InfoStep step={1} title='Dirección'>
            <Text className='flex-wrap text-gray-500'>Indicar tu dirección de residencia.</Text>
          </InfoStep>
          <View className='mt-2' />
          <InfoStep step={2} title='Ocupación y profesión'>
            <Text className='flex-wrap text-gray-500'>Indicar de donde provienen tus ingresos.</Text>
          </InfoStep>
          <View className='mt-2' />
          <InfoStep step={3} title='Documento de identidad'>
            <Text className='flex-wrap text-gray-500'>Validar tu documento registrado.</Text>
          </InfoStep>
        </Card>
        <View className='mt-6' />
        <Pressable className='flex-row items-center' onPress={() => setAccepted((prev) => !prev)}>
          <Checkbox.Android status={accepted ? 'checked' : 'unchecked'} color={colors.primary700} />
          <Text className=' ml-1 flex-wrap flex-1'>Acepto que todos la información a introducir es veráz y pertenencen a mi.</Text>
        </Pressable>

        <View className='mt-10' />
        <Button disabled={!accepted} onPress={handleBegin}>
          Comenzar
        </Button>
      </Container>
    </SafeArea>
  )
}
