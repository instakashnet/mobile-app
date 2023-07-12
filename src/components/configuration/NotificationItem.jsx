import { View } from 'react-native'
import { Text } from 'react-native-paper'

import Switch from '../UI/Swtich'

function NotificationItem({ label, name, value, onChange }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text variant="button">{label}</Text>
      <Switch value={value} onChange={value => onChange(name, value)} />
    </View>
  )
}

export default NotificationItem