import { Switch as PaperSwitch, useTheme } from 'react-native-paper'

function Switch({ value, onChange }) {
  const { colors } = useTheme()

  return <PaperSwitch value={value} onValueChange={onChange} color={colors.primary700} />
}

export default Switch
