import { configureFonts, MD3LightTheme as DefaultTheme, MD3LightTheme } from 'react-native-paper'

import { colors } from './colors'
import { fontsConfig } from './fonts'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors,
  },
  fonts: configureFonts({ config: fontsConfig }),
}
