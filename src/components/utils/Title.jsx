import { Text, useTheme } from 'react-native-paper'

export default function Title({ children, style = [], ...rest }) {
  const { colors } = useTheme()

  return (
    <Text variant="titleLarge" adjustsFontSizeToFit allowFontScaling={false} style={[{ color: colors.primary700 }, ...style]} {...rest}>
      {children}
    </Text>
  )
}
