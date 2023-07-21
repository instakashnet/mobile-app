import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import Countdown from 'react-countdown'
import { View } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Text, useTheme } from 'react-native-paper'

export default function Timer({ timerId, countdown, onFinish }) {
  const isFocused = useIsFocused()
  const timerRef = useRef(null)

  useEffect(() => {
    if (!isFocused) {
      timerRef.current?.pause()
    } else timerRef.current?.start()
  }, [isFocused])

  return <Countdown ref={timerRef} key={timerId} date={countdown} renderer={props => <Renderer {...props} />} onComplete={onFinish} />
}

const Renderer = ({ total, formatted: { minutes, seconds } }) => {
  const { colors } = useTheme()
  const progressSeconds = useRef(Math.floor(total / 1000))

  return (
    <View className="flex-row items-center gap-x-2">
      <CountdownCircleTimer isPlaying duration={progressSeconds.current} size={17} strokeWidth={2.5} colors={colors.primary700} />
      <Text variant="button">
        {minutes}:{seconds}
      </Text>
    </View>
  )
}
