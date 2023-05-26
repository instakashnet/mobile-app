import React, { useMemo } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { Feather } from '@expo/vector-icons'
import { Controller } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

export default function Select({ label, options = [], name, error, control, onSelect }) {
  const { colors } = useTheme()

  const selectStyles = useMemo(() => styles(error, colors), [error])

  const handleSelect = (value, onChange) => {
    onSelect(value)
    onChange(value)
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <RNPickerSelect
          onValueChange={(value) => (onSelect ? handleSelect(value, onChange) : onChange(value))}
          placeholder={{
            label,
            color: '#444'
          }}
          items={options}
          value={value}
          style={selectStyles}
          Icon={() => <Feather name='chevron-down' size={20} color='gray' style={{ position: 'absolute', top: 12, right: 6 }} />}
          useNativeAndroidPickerStyle={false}
        />
      )}
    />
  )
}

const styles = (error, colors) =>
  StyleSheet.create({
    inputIOS: {
      borderWidth: 2,
      borderColor: error ? colors.error : '#d0d0d0',
      borderRadius: 4,
      paddingHorizontal: 10,
      height: 45,
      backgroundColor: '#fff',
      fontFamily: 'poppins-regular',
      fontSize: 16
    },
    inputAndroid: {
      borderWidth: 2,
      borderColor: error ? colors.error : '#d0d0d0',
      borderRadius: 4,
      paddingHorizontal: 10,
      height: 45,
      backgroundColor: '#fff',
      fontFamily: 'poppins-regular',
      fontSize: 16
    }
  })
