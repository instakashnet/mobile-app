import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Text from '../utils/Text'

export default function ChangeProfileBtn({ onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} className="self-end mb-4 flex-row items-center gap-x-2">
      <Text variant="button">Cambiar perfil</Text>
      <Ionicons name="chevron-forward-outline" size={20} color="green" />
    </TouchableOpacity>
  )
}
