import React, { useEffect } from 'react'
import { Pressable, View } from 'react-native'
import { Text } from 'react-native-paper'

import Logo from '../../../assets/images/svgs/Logo'
import OnboardingSwiper from '../../components/auth/OnboardingSwiper'
import Button from '../../components/UI/Button'
import Link from '../../components/utils/Link'
import SafeArea from '../../components/utils/SafeArea'
import { getData, storeData } from '../../lib/AsyncStorage'

export default function OnboardingScreen({ navigation }) {
  useEffect(() => {
    const checkFirstTime = async () => {
      const firstTime = await getData('firstTime')
      if (firstTime) return navigation.navigate('Login')

      await storeData('firstTime', true)
    }

    checkFirstTime()
  }, [navigation])

  return (
    <SafeArea>
      <View className="flex-1 items-center mt-6 p-6">
        <Logo width={200} />
        <OnboardingSwiper />
        <View className="mt-auto w-full">
          <Button onPress={() => navigation.navigate('Register')}>Registrate</Button>
          <Pressable className="mt-4 self-center" onPress={() => navigation.navigate('Login')}>
            <Text>
              ¿Ya tienes una cuenta? <Link>Ingresa</Link>
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeArea>
  )
}
