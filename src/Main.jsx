import { useRefresh } from '@/hooks/useRefresh'
import LoadingScreen from '@/screens/LoadingScreen'
import MainNavigator from '@/navigators/MainNavigator'
import Updater from './hoc/Updater'

function Main({ onLayout }) {
  const { isSessionLoading } = useRefresh()

  if (isSessionLoading) return <LoadingScreen />

  return (
    <Updater>
      <MainNavigator onLayout={onLayout} />
    </Updater>
  )
}

export default Main
