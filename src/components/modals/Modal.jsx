import { Portal, Modal as PaperModal } from 'react-native-paper'
import { View } from 'react-native'

import Button from '../UI/Button'
import Text from '../utils/Text'

function Modal({ title, children, actionButtons = [], visible, onDismiss }) {
  return (
    <Portal>
      <PaperModal
        visible={visible}
        onDismiss={onDismiss}
        className="px-8"
        contentContainerStyle={{ borderRadius: 12, backgroundColor: '#fff', paddingHorizontal: 24, paddingVertical: 24 }}>
        <Text variant="title" className="text-center mb-2">
          {title}
        </Text>
        {children}
        <View className="mt-6 items-center">
          {actionButtons.map((button, index) => (
            <Button className="my-3 w-full" key={index} variant={button.variant || 'primary'} onPress={button.onPress} {...button.btnProps}>
              {button.label}
            </Button>
          ))}
        </View>
      </PaperModal>
    </Portal>
  )
}

export default Modal
