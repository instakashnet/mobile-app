import React from 'react'
import { View } from 'react-native'
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg'

export default function GoogleIcon({ width, ...rest }) {
  const aspectRatio = 16 / 17

  return (
    <View style={{ width, aspectRatio }}>
      <Svg
        width='100%'
        height='100%'
        viewBox='0 0 16 17'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...rest}
      >
        <G clipPath='url(#clip0_31_1420)'>
          <Path
            d='M15.81 8.277c0-.655-.054-1.134-.169-1.63H8.156v2.959h4.393c-.088.735-.566 1.843-1.63 2.587l-.014.099 2.366 1.833.164.017c1.506-1.391 2.374-3.438 2.374-5.865z'
            fill='#4285F4'
          />
          <Path
            d='M8.156 16.073c2.152 0 3.96-.71 5.28-1.931l-2.517-1.95c-.673.47-1.576.798-2.763.798-2.109 0-3.898-1.39-4.536-3.313l-.093.008-2.461 1.904-.032.09a7.967 7.967 0 007.122 4.394z'
            fill='#34A853'
          />
          <Path
            d='M3.62 9.677A4.908 4.908 0 013.355 8.1c0-.55.097-1.08.256-1.577l-.004-.105-2.492-1.936-.081.04A7.98 7.98 0 00.184 8.1c0 1.284.31 2.498.85 3.579L3.62 9.677z'
            fill='#FBBC05'
          />
          <Path
            d='M8.156 3.21c1.497 0 2.507.647 3.082 1.187l2.25-2.197C12.107.916 10.308.128 8.156.128A7.967 7.967 0 001.034 4.52L3.61 6.523C4.258 4.601 6.047 3.21 8.156 3.21z'
            fill='#EB4335'
          />
        </G>
        <Defs>
          <ClipPath id='clip0_31_1420'>
            <Path
              fill='#fff'
              transform='translate(.182 .128)'
              d='M0 0H15.6352V16H0z'
            />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  )
}
