import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { useTheme } from 'react-native-paper'

export default function Input({ label, onChange, value, ...rest }) {
  const [focus, setFocus] = useState(false)
  const { colors, fonts } = useTheme()

  return (
    <TextInput
      placeholder={label}
      placeholderTextColor={colors.gray500}
      onChangeText={onChange}
      className={`px-4 bg-white h-12 text-sm border-[2px] leading-5 ${focus ? 'border-[#0d8284]' : 'border-gray-300'} rounded-md`}
      style={{ fontFamily: fonts.bodyLarge.fontFamily }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      value={value}
      {...rest}
    />
  )
}
