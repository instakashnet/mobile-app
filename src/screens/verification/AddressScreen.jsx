import React from 'react'
import { Text } from 'react-native-paper'
import { View } from 'react-native'

import SafeArea from '../../components/utils/SafeArea'
import Container from '../../components/utils/Container'
import AddressForm from '../../components/verification/AddressForm'
import { steps } from '../../utils/verification-steps'
import StepsBar from '../../components/utils/StepsBar'

export default function AddressScreen() {
  return (
    <SafeArea>
      <Container>
        <StepsBar activeStep={1} steps={steps} />
        <Text className="mt-6">Ingresa tu dirección real de residencia</Text>
        <View className="mt-6" />
        <AddressForm />
      </Container>
    </SafeArea>
  )
}
