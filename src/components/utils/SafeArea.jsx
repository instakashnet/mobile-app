import { SafeAreaView } from 'react-native'

export default function SafeArea({ children }) {
  return <SafeAreaView className="flex-1">{children}</SafeAreaView>
}
