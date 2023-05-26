import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { TextInput } from 'react-native'
import { useTheme } from 'react-native-paper'

const PhoneInput = ({ control, name, label, error, ...rest }) => {
  const { colors, fonts } = useTheme()
  const [focus, setFocus] = useState(false)

  const PHONE_REGEX = /^[0-9+]*$/

  const handlePhoneChange = (text) => {
    if (text === '' || PHONE_REGEX.test(text)) {
      return text
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          keyboardType='phone-pad'
          placeholder={label}
          placeholderTextColor={colors.gray500}
          value={value}
          onChangeText={(value) => onChange(handlePhoneChange(value))}
          className={`px-4 bg-white h-12 text-md border-[2px] leading-5 ${
            focus ? 'border-[#0d8284]' : Boolean(error) ? 'border-red-300' : 'border-gray-300'
          } rounded-md`}
          style={{ fontFamily: fonts.bodyLarge.fontFamily, fontSize: fonts.bodyLarge.fontSize }}
          onFocus={() => setFocus(true)}
          onBlur={(props) => {
            onBlur(props)
            setFocus(false)
          }}
          maxLength={15}
          selectTextOnFocus
          {...rest}
        />
      )}
    />
  )
}

export default PhoneInput
