import { SafeAreaView } from 'react-native'

export default function SafeArea({ children }) {
  return <SafeAreaView className='flex-1 w-full'>{children}</SafeAreaView>
}
