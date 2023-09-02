import React from 'react'
import { View } from 'react-native'

import Container from '../../components/utils/Container'
import SafeArea from '../../components/utils/SafeArea'
import StepsBar from '../../components/utils/StepsBar'
import AddressForm from '../../components/verification/AddressForm'
import { steps } from '../../utils/verification-steps'
import Text from '@/components/utils/Text'

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
