import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Container from './Container'
import SafeArea from './SafeArea'

function Screen({ children, containerClasses = '' }) {
  return (
    <SafeArea>
      <KeyboardAwareScrollView keyboardDismissMode="on-drag" contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <Container classes={containerClasses}>{children}</Container>
      </KeyboardAwareScrollView>
    </SafeArea>
  )
}

export default Screen
