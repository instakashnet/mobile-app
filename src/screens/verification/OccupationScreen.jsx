import React from 'react'
import SafeArea from '../../components/utils/SafeArea'
import StepsBar from '../../components/utils/StepsBar'
import { Text } from 'react-native-paper'
import Container from '../../components/utils/Container'
import { View } from 'react-native'
import { steps } from '../../utils/verification-steps'
import OccupationForm from '../../components/verification/OccupationForm'

export default function AddressScreen({ navigation }) {
  return (
    <SafeArea>
      <Container>
        <StepsBar activeStep={1} steps={steps} />
        <Text className='mt-6'>Completa los datos adicionales</Text>
        <View className='mt-6' />
        <OccupationForm navigate={navigation.navigate} />
      </Container>
    </SafeArea>
  )
}
