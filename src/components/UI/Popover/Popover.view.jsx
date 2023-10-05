import { useRef } from 'react'
import { Animated, Dimensions, Pressable, View } from 'react-native'

import { useUpdate } from '@/hooks/useUpdate'
import Button from '../Button'
import { Portal } from 'react-native-paper'

function Popover({ onClose, isVisible, children }) {
  const slideAnim = useRef(new Animated.Value(0)).current
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start(onClose)
  }

  useUpdate(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start()
    }
  }, [isVisible])

  const translateYView = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  })

  //   const handleSelect = account => {
  //     slideOut()
  //     onSelect(account)
  //   }

  return isVisible ? (
    <Portal>
      <AnimatedPressable
        onPress={slideOut}
        className="flex-1 justify-end"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: slideAnim }}>
        <Animated.View
          className="w-full bg-white p-7 rounded-t-xl mt-auto"
          style={{
            minHeight: Dimensions.get('window').height / 2,
            transform: [{ translateY: translateYView }],
          }}>
          <View className="w-full">
            {children}
            <Button variant="secondary" className="mt-auto" onPress={slideOut}>
              Regresar
            </Button>
          </View>
        </Animated.View>
      </AnimatedPressable>
    </Portal>
  ) : null
}

export default Popover
