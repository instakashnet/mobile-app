import React, { useRef, useState } from 'react'
import PagerView from 'react-native-pager-view'
import { Image, Platform, View } from 'react-native'

import Title from '../utils/Title'
import onboardingImages from '../../../data/onboardingImages'
import Text from '../utils/Text'

export default function OnboardingSwiper() {
  const [pageIndex, setPageIndex] = useState(0)
  const pagerRef = useRef(null)

  return (
    <>
      <PagerView
        className="flex-[.95] w-full h-full mt-3"
        ref={pagerRef}
        onPageSelected={e => setPageIndex(e.nativeEvent.position)}
        initialPage={0}>
        <View className="flex-1 items-center justify-center" key="1">
          <Title className="text-center mb-3">Cambia dinero de forma rápida y segura</Title>
          <View className="w-full h-3/4">
            <Image source={onboardingImages.onboarding1[Platform.OS]} resizeMode="contain" className="w-full h-full" />
          </View>
          <Text className="text-center mt-4">Tenemos la mejor tasa y el servicio más rápido.</Text>
        </View>
        <View className="flex-1 items-center justify-center" key="2">
          <Title className="text-center mb-3">Gana refiriendo y cambiando</Title>
          <View className="w-full h-3/4">
            <Image source={onboardingImages.onboarding2[Platform.OS]} resizeMode="contain" className="w-full h-full" />
          </View>
          <Text adjustsFontSizeToFit className="text-center mt-4">
            Al referir recibes KASH, equivalente a $2 que puedes retirar o acumular.
          </Text>
        </View>
        <View className="flex-1 items-center mt-3" key="3">
          <Title className="text-center mb-2">Aseguramos tus cambios y tu dinero</Title>
          <View className="w-full h-3/4">
            <Image source={require('../../../assets/images/mockups/safe-exchange.webp')} resizeMode="contain" className="w-full h-full" />
          </View>
          <Text adjustsFontSizeToFit className="text-center mt-4">
            Nuestro sistema de KYC y verificación te mantiene seguro. Soporte siempre.
          </Text>
        </View>
      </PagerView>
      <View className="flex-row items-center justify-center mt-4">
        <View className={`h-3 ${pageIndex === 0 ? 'w-8 bg-[#0a686a]' : 'w-3 bg-gray-300'} rounded-full mx-1`} />
        <View className={`h-3  ${pageIndex === 1 ? 'w-8 bg-[#0a686a]' : 'w-3 bg-gray-300'} rounded-full mx-1`} />
        <View className={`h-3  ${pageIndex === 2 ? 'w-8 bg-[#0a686a]' : 'w-3 bg-gray-300'} rounded-full mx-1`} />
      </View>
    </>
  )
}
