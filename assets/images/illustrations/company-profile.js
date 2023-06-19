import * as React from 'react'
import { View } from 'react-native'
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg'

export function CompanyProfileIcon({ width }) {
  const aspectRatio = 36 / 37

  return (
    <View style={{ width, aspectRatio }}>
      <Svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' fill='none' viewBox='0 0 36 37'>
        <Rect width={36} height={36} y={0.333} fill='#F0F7F8' rx={18} />
        <Path
          stroke='url(#a)'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M9.75 28.332h16.5m-15.75-18h15m-14.25 0v18m13.5-18v18M15 14.082h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H21m-1.5 3H21m-1.5 3H21m-6 8.25v-3.375c0-.62.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125v3.375'
        />
        <Defs>
          <LinearGradient id='a' x1={9.75} x2={26.571} y1={10.332} y2={10.638} gradientUnits='userSpaceOnUse'>
            <Stop stopColor='#20A2A5' />
            <Stop offset={1} stopColor='#67BE9F' />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  )
}
