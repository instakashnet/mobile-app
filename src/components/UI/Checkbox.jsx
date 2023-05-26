import React from 'react'
import { Controller } from 'react-hook-form'
import { Pressable } from 'react-native'
import { Checkbox as PaperCheckbox, useTheme } from 'react-native-paper'

export default function Checkbox({ children, control, error, name }) {
  const { colors } = useTheme()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Pressable className='flex-row items-center justify-center' onPress={() => onChange(!value)}>
          <PaperCheckbox.Android status={value ? 'checked' : 'unchecked'} color={error ? colors.error : colors.primary700} />
          {children}
        </Pressable>
      )}
    />
  )
}
