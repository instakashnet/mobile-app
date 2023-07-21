import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Container from './Container'
import SafeArea from './SafeArea'

function Screen({ children }) {
  return (
    <SafeArea>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <Container>{children}</Container>
      </KeyboardAwareScrollView>
    </SafeArea>
  )
}

export default Screen
