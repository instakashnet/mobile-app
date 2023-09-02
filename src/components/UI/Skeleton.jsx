import { useEffect, useRef } from 'react'
import { StyleSheet, Animated, Easing } from 'react-native'

export default function Skeleton({
  width,
  height,
  borderRadius,
  backgroundColor,
  marginVertical = 0,
  marginHorizontal = 0,
  marginLeft = 0,
  marginRight = 0,
}) {
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start()
    }

    startAnimation()
  }, [])

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 0.8, 0.5],
  })

  const styles = StyleSheet.create({
    skeleton: {
      width,
      height,
      borderRadius,
      backgroundColor: backgroundColor || '#e0e0e0',
      marginVertical,
      marginHorizontal,
      marginLeft,
      marginRight,
      opacity,
    },
  })

  return <Animated.View style={styles.skeleton} />
}
