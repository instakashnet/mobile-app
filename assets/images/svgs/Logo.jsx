import * as React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

const Logo = ({ width, ...rest }) => (
  <View style={{ width, aspectRatio: 207 / 37 }}>
    <Svg
      width='100%'
      height='100%'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 207 37`}
      {...rest}
    >
      <Path
        d='M8.52 6.724V31.8c0 2.23-1.8 4.04-4.018 4.04A4.033 4.033 0 0 1 .485 31.8V6.724c0-2.23 1.8-4.04 4.017-4.04 2.218 0 4.017 1.81 4.017 4.04ZM28.088 20.557c0-2.254-.438-3.82-1.947-3.82-1.8 0-3.699 2.547-3.699 6.808v8.967c0 1.834-1.481 3.324-3.305 3.324h-1.082c-1.824 0-3.305-1.49-3.305-3.324v-9.408c0-3.235-.47-5.554-1.011-7.156-.606-1.779.338-3.713 2.122-4.277 1.588-.505 3.324.248 3.997 1.782.243.552.466 1.193.637 1.914 1.704-3.036 4.87-4.458 8.325-4.458 5.065 0 7.012 3.38 7.012 8.523v13.084c0 1.834-1.482 3.324-3.305 3.324h-1.13c-1.824 0-3.305-1.49-3.305-3.324V20.557h-.004ZM40.064 18.11c0-4.16 3.213-7.297 8.616-7.297 2.194 0 4.2.417 5.745.877 1.68.501 2.54 2.371 1.823 3.981a2.886 2.886 0 0 1-3.67 1.534c-.9-.344-1.892-.612-2.831-.612-1.023 0-1.852.44-1.852 1.421 0 1.03 1.462 2.059 3.651 2.988 3.846 1.618 6.088 3.672 6.088 7.445 0 4.213-3.018 7.886-8.763 7.886-2.58 0-4.87-.505-6.653-1.07a2.922 2.922 0 0 1-1.78-3.98l.052-.12a2.895 2.895 0 0 1 3.758-1.487c1.008.417 2.154.777 3.162.777 1.361 0 2.337-.536 2.337-1.566 0-1.225-1.218-2.254-2.87-2.887-4.866-1.966-6.813-4.217-6.813-7.89ZM63.43 11.45l.522-3.18A2.784 2.784 0 0 1 66.094 6l1.47-.325c1.728-.38 3.364.945 3.364 2.723v3.048h5.745l-.924 5.679h-4.821v10.921c0 1.422.78 2.155 2.241 2.155.375 0 .769-.032 1.151-.076 1.374-.168 2.656.733 2.998 2.082a2.79 2.79 0 0 1-2.15 3.425c-1.127.228-2.492.4-4.093.4-4.87 0-7.792-1.81-7.792-6.66V17.129h-3.846V11.45h3.994ZM101.454 35.059l-2.35.745a2.023 2.023 0 0 1-2.345-.89 10.504 10.504 0 0 1-1.337-3.58c-1.071 3.036-3.166 4.798-6.67 4.798-6.377 0-9.395-4.85-9.395-12.195 0-7.493 4.965-13.028 12.219-13.028 2.719 0 6.12.641 8.082 1.062a2.038 2.038 0 0 1 1.604 1.998v10.065c0 4.065.741 6.688 1.442 8.254a2.045 2.045 0 0 1-1.25 2.771Zm-7.888-16.428c0-1.105-.876-2.035-1.978-2.043h-.016c-3.166 0-4.041 2.888-4.041 6.857 0 3.624.147 7.004 2.484 7.004 1.995 0 3.555-3.672 3.555-7.785V18.63h-.004Z'
        fill='#20A2A5'
      />
      <Path
        d='M115.572 2.683V35.84h-8.035V2.683h8.035Zm20.691 33.153h-8.958l-11.2-18.17v-.59c5.745-2.79 7.597-7.344 9.153-14.397h7.983c-1.851 9.256-4.869 12.976-8.373 15.72l11.395 17.437Z'
        fill='#67BE9F'
      />
      <Path
        d='m161.481 34.27-6.183 1.958s-1.752-1.666-2.337-4.898c-1.071 3.036-3.165 4.798-6.669 4.798-6.378 0-9.396-4.85-9.396-12.195 0-7.493 4.965-13.027 12.219-13.027 4.041 0 9.591 1.421 9.687 1.421v11.707c0 7.741 2.679 10.236 2.679 10.236ZM151.11 16.985c-.438-.196-1.414-.392-1.995-.392-3.165 0-4.041 2.887-4.041 6.856 0 3.624.147 7.004 2.484 7.004 1.995 0 3.556-3.672 3.556-7.785v-5.683h-.004Z'
        fill='#69BEA0'
      />
      <Path
        d='M163.767 18.11c0-4.16 3.213-7.297 8.616-7.297 4.869 0 8.81 2.059 8.81 2.059l-2.428 5.483c-1.071-.541-3.309-1.762-5.308-1.762-1.023 0-1.851.44-1.851 1.421 0 1.03 1.461 2.059 3.651 2.988 3.846 1.618 6.088 3.672 6.088 7.445 0 4.213-3.018 7.886-8.763 7.886-4.48 0-8.083-1.518-9.687-2.255l2.532-5.631c.633.292 3.504 2.006 5.697 2.006 1.362 0 2.337-.536 2.337-1.566 0-1.225-1.218-2.254-2.87-2.887-4.877-1.966-6.824-4.217-6.824-7.89ZM199.504 10.91c5.065 0 7.011 3.328 7.011 8.522v16.404h-7.739V20.557c0-2.303-.438-3.82-1.947-3.82-1.704 0-3.699 2.35-3.699 6.171v12.928h-7.692V1.654l7.688-1.321v12.783c1.704-1.518 3.989-2.207 6.378-2.207Z'
        fill='#67BE9F'
      />
    </Svg>
  </View>
)

export default Logo