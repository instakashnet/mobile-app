import { Pressable, View, Animated, Dimensions } from 'react-native'
import React, { useRef } from 'react'
import { Portal, Text, useTheme } from 'react-native-paper'
import SelectAccountList from './SelectAccountList'
import Button from '../UI/Button'
import { useUpdate } from '../../hooks/useUpdate'

export default function SelectAccountModal({ onClose, onSelect, currencyId, isVisible }) {
  const { colors } = useTheme()
  const slideAnim = useRef(new Animated.Value(0)).current
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true
    }).start(onClose)
  }

  useUpdate(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true
      }).start()
    }
  }, [isVisible])

  const translateYView = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0]
  })

  const handleSelect = (account) => {
    slideOut()
    onSelect(account)
  }

  return (
    <Portal>
      {/* flex-[.5] w-full bg-white p-7 rounded-t-xl mt-auto */}
      {isVisible && (
        <AnimatedPressable
          onPress={slideOut}
          className='flex-1 justify-end'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: slideAnim }}
        >
          <Animated.View
            className='w-full bg-white p-7 rounded-t-xl mt-auto'
            style={{
              minHeight: Dimensions.get('window').height / 2,
              transform: [{ translateY: translateYView }]
            }}
          >
            <Text variant='titleLarge' className='text-center mt-3' style={{ color: colors.primary700 }}>
              Selecciona una cuenta
            </Text>
            <View className='mt-4' />
            <SelectAccountList currencyId={currencyId} onSelect={handleSelect} />
            <View className='mt-3' />
            <Button variant='secondary' onPress={slideOut}>
              Regresar
            </Button>
            <View className='pb-3' />
          </Animated.View>
        </AnimatedPressable>
      )}
    </Portal>
  )
}
