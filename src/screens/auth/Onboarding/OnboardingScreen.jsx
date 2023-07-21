import React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from 'react-native-paper'

import Logo from '../../../../assets/images/svgs/Logo'
import OnboardingSwiper from '../../../components/auth/OnboardingSwiper'
import Button from '../../../components/UI/Button'
import Container from '../../../components/utils/Container'
import Link from '../../../components/utils/Link'
import SafeArea from '../../../components/utils/SafeArea'
import { useOnboarding } from './Onboarding.logic'

export default function OnboardingScreen() {
  const { login, signUp } = useOnboarding()

  return (
    <SafeArea>
      <Container>
        <View className="items-center mt-6">
          <Logo width={200} />
        </View>
        <OnboardingSwiper />
        <View className="mt-auto w-full">
          <Button onPress={signUp}>Registrate</Button>

          <View className="flex-row items-center justify-center gap-2 mt-6">
            <Text>¿Ya tienes una cuenta?</Text>
            <Pressable onPress={login}>
              <Link>Ingresa</Link>
            </Pressable>
          </View>
        </View>
      </Container>
    </SafeArea>
  )
}
