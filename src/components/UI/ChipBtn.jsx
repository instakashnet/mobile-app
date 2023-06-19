import { Chip, useTheme } from 'react-native-paper'

function ChipBtn({ children, onPress, Icon, ...rest }) {
  const { colors, fonts } = useTheme()

  return (
    <Chip icon={Icon} textStyle={{ fontFamily: fonts.default.fontFamily }} onPress={onPress} {...rest}>
      {children}
    </Chip>
  )
}

export default ChipBtn
