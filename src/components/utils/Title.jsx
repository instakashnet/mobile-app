import { Text, useTheme } from 'react-native-paper'

export default function Title({ children, style = [], ...rest }) {
  const { colors } = useTheme()

  return (
    <Text
      variant='titleLarge'
      style={[{ color: colors.primary700 }, ...style]}
      {...rest}
    >
      {children}
    </Text>
  )
}
