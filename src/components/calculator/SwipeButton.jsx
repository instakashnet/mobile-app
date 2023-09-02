import { Pressable } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

import SwapArrowsIcon from '../../../assets/images/svgs/SwapIcon'

export default function SwipeButton({ onSwipe }) {
  const { colors } = useTheme()

  return (
    <Pressable
      className="rounded-full absolute right-8 top-[37%] z-10 items-center justify-center h-[50px] w-[50px] p-1 border-[6px]"
      style={{ backgroundColor: colors.secondary500, borderColor: colors.primary700 }}
      onPress={onSwipe}>
      <SwapArrowsIcon width={22} />
    </Pressable>
  )
}
