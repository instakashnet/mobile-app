import { useNavigation } from '@react-navigation/native'
import { Pressable, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

function HeaderBackButton({ iconProps = {} }) {
  const navigation = useNavigation()

  return (
    <Pressable onPress={navigation.goBack}>
      <Ionicons name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} size={24} {...iconProps} />
    </Pressable>
  )
}

export default HeaderBackButton
