import React, { useState } from 'react'
import { useTheme } from 'react-native-paper'
import { TextInput } from 'react-native'
import { Controller } from 'react-hook-form'

export default function Input({ control, name, label, error, ...rest }) {
  const { colors, fonts } = useTheme()
  const [focus, setFocus] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <TextInput
            placeholder={label}
            placeholderTextColor={colors.gray500}
            onChangeText={onChange}
            className={`px-4 bg-white h-12 text-md border-[2px] leading-5 ${
              focus ? 'border-[#0d8284]' : Boolean(error) ? 'border-red-300' : 'border-gray-300'
            } rounded-md`}
            style={{ fontFamily: fonts.bodyLarge.fontFamily, fontSize: fonts.bodyLarge.fontSize }}
            onFocus={() => setFocus(true)}
            onBlur={(props) => {
              onBlur(props)
              setFocus(false)
            }}
            value={value}
            {...rest}
          />
        )
      }}
    />
  )
}
