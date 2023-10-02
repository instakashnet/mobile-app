import { DefaultTheme } from '@react-navigation/native'
import { adaptNavigationTheme } from 'react-native-paper'

import { colors } from '../colors'

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
})

export const theme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    background: colors.white300,
  },
}
