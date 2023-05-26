import * as React from 'react'
import { View } from 'react-native'
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg'

export default function AppleIcon({ width, ...rest }) {
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
        <G clipPath='url(#clip0_176_3768)'>
          <Path
            d='M10.353 2.68a3.504 3.504 0 00.848-2.552 3.552 3.552 0 00-2.4 1.215 3.336 3.336 0 00-.8 2.472 2.952 2.952 0 002.352-1.136zM12.37 8.63a3.607 3.607 0 011.728-3.048 3.727 3.727 0 00-2.928-1.6c-1.248-.128-2.4.728-3.064.728-.663 0-1.6-.712-2.64-.696A3.936 3.936 0 002.155 6.04c-1.408 2.448-.36 6.088 1.048 8.064.64.968 1.44 2.063 2.496 2.024 1.056-.04 1.4-.656 2.623-.656 1.224 0 1.6.655 2.64.631 1.04-.024 1.776-.991 2.448-1.96a8.799 8.799 0 001.104-2.28 3.528 3.528 0 01-2.144-3.231z'
            fill='#000'
          />
        </G>
        <Defs>
          <ClipPath id='clip0_176_3768'>
            <Path fill='#fff' transform='translate(0 .128)' d='M0 0H16V16H0z' />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  )
}
