import React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

export default function Icon({ width, ...rest }) {
  return (
    <View style={{ width, aspectRatio: 71 / 49 }}>
      <Svg
        fill='none'
        viewBox='0 0 71 49'
        xmlns='http://www.w3.org/2000/svg'
        {...rest}
      >
        <Path
          d='M11.98 5.977v36.301c0 3.23-2.628 5.85-5.869 5.85-3.24 0-5.868-2.62-5.868-5.85v-36.3c0-3.231 2.628-5.85 5.868-5.85 3.242 0 5.869 2.619 5.869 5.85Z'
          fill='#20A2A5'
        />
        <Path
          d='M32.617 48.128a5.432 5.432 0 0 1-4.614-2.561L13.38 22.052a.938.938 0 0 1 .383-1.34c6.853-3.487 9.766-8.793 11.863-16.55A5.443 5.443 0 0 1 30.873.127h.432c3.658 0 6.289 3.54 5.185 7.017-2.68 8.445-6.335 12.551-10.45 15.742l11.114 16.856c2.373 3.598-.217 8.385-4.537 8.385Z'
          fill='#67BE9F'
        />
        <Path
          d='M69.53 21.592 55.344 10.343c-1.404-1.113-3.327.496-2.471 2.066l5.954 10.936a1.64 1.64 0 0 1 0 1.566l-5.954 10.935c-.855 1.57 1.067 3.179 2.47 2.066L69.53 26.663a3.235 3.235 0 0 0 0-5.071Z'
          fill='#22A1A4'
        />
        <Path
          d='M63.978 21.933 49.362 10.342c-1.403-1.113-3.327.496-2.47 2.066l5.953 10.936a1.639 1.639 0 0 1 0 1.565l-5.954 10.936c-.855 1.57 1.068 3.179 2.471 2.066l14.616-11.59a2.796 2.796 0 0 0 0-4.388Z'
          fill='#67BD9E'
        />
      </Svg>
    </View>
  )
}
