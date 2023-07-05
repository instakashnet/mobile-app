import React from 'react'
import { Text } from 'react-native-paper'
import { View } from 'react-native'

import SafeArea from '../../components/utils/SafeArea'
import StepsBar from '../../components/utils/StepsBar'
import Container from '../../components/utils/Container'
import { steps } from '../../utils/verification-steps'
import OccupationForm from '../../components/verification/OccupationForm'

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
