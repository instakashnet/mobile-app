import { View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

import SelectAccountList from './SelectAccountList'
import Text from '../utils/Text'
import Popover from '../UI/Popover/Popover.view'

export default function SelectAccountModal({ onClose, onSelect, currencyId, isVisible, accType }) {
  const { colors } = useTheme()

  const handleSelect = account => {
    onClose()
    onSelect(account)
  }

  return (
    <Popover isVisible={isVisible} onClose={onClose}>
      <Text variant="titleLarge" className="text-center mt-3" style={{ color: colors.primary700 }}>
        Selecciona una cuenta
      </Text>
      <View className="mt-4" />
      <SelectAccountList currencyId={currencyId} onSelect={handleSelect} accType={accType} />
      <View className="mt-3" />
    </Popover>
  )
}
