import { Text, useTheme } from 'react-native-paper'

export default function Link({ children, style = [], ...rest }) {
  const { colors } = useTheme()

  return (
    <Text variant="button" style={[{ color: colors.primary700, textDecorationLine: 'underline' }, ...style]} {...rest}>
      {children}
    </Text>
  )
}
