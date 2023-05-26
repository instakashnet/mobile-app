import React, { useRef, useState } from 'react'
import Title from '../utils/Title'
import PagerView from 'react-native-pager-view'
import { Image, useWindowDimensions, View } from 'react-native'
import { Text } from 'react-native-paper'

export default function OnboardingSwiper() {
  const [pageIndex, setPageIndex] = useState(0)
  const { width } = useWindowDimensions()
  const pagerRef = useRef(null)

  return (
    <>
      <PagerView
        className='flex-[.95] w-full h-full mt-10'
        ref={pagerRef}
        onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
        initialPage={0}
      >
        <View className='flex-1 items-center' key='1'>
          <Title className='text-center'>Cambia dinero de forma rápida y segura</Title>
          <Image
            source={require('../../../assets/images/mockups/best-rate.webp')}
            resizeMode='contain'
            style={{ width: width, height: '60%' }}
          />
          <Text variant='bodyLarge' className='text-center mt-6'>
            Tenemos la mejor tasa y el servicio más rápido.
          </Text>
        </View>
        <View className='flex-1 items-center' key='2'>
          <Title className='text-center'>Gana refiriendo y cambiando</Title>
          <Image
            source={require('../../../assets/images/mockups/referals.webp')}
            resizeMode='contain'
            className='mt-10'
            style={{ width: width / 1.1, height: '55%' }}
          />
          <Text variant='bodyLarge' className='text-center mt-8'>
            Al referir recibes KASH, equivalente a $2 que puedes retirar o acumular.
          </Text>
        </View>
        <View className='flex-1 items-center' key='3'>
          <Title className='text-center'>Aseguramos tus cambios y tu dinero</Title>
          <Image
            source={require('../../../assets/images/mockups/safe-exchange.webp')}
            resizeMode='contain'
            style={{ width: width / 1.15, height: '60%' }}
          />
          <Text variant='bodyLarge' className='text-center mt-6'>
            Nuestro sistema de KYC y verificación te mantiene seguro. Soporte siempre.
          </Text>
        </View>
      </PagerView>
      <View className='flex-row items-center justify-center '>
        <View className={`h-3 ${pageIndex === 0 ? 'w-8 bg-[#0a686a]' : 'w-3 bg-gray-300'} rounded-full mx-1`} />
        <View className={`h-3  ${pageIndex === 1 ? 'w-8 bg-[#0a686a]' : 'w-3 bg-gray-300'} rounded-full mx-1`} />
        <View className={`h-3  ${pageIndex === 2 ? 'w-8 bg-[#0a686a]' : 'w-3 bg-gray-300'} rounded-full mx-1`} />
      </View>
    </>
  )
}
