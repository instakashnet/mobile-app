import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

import Container from '../../components/utils/Container'
import SafeArea from '../../components/utils/SafeArea'
import StepsBar from '../../components/utils/StepsBar'
import OccupationForm from '../../components/verification/OccupationForm'
import { steps } from '../../utils/verification-steps'

export default function AddressScreen() {
  return (
    <SafeArea>
      <Container>
        <StepsBar activeStep={2} steps={steps} />
        <Text className="mt-6">Completa los datos adicionales</Text>
        <View className="mt-6" />
        <OccupationForm />
      </Container>
    </SafeArea>
  )
}
