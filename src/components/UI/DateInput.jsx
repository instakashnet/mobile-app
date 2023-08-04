import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'

import { formatDate } from '../../helpers/formatters'
import DatePicker from './DatePicker'

export default function DateInput({ control, name, label, error }) {
  const [showPicker, setShowPicker] = useState(false)

  const handleShowPicker = () => {
    console.log('show picker')
    setShowPicker(true)
  }

  const handleHidePicker = () => setShowPicker(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <>
            <TouchableOpacity
              onPress={handleShowPicker}
              activeOpacity={0.8}
              className={`bg-white w-full h-[49px] px-4 rounded-lg border-2 ${
                error ? 'border-red-300' : 'border-gray-300'
              } justify-center`}>
              <Text className={`text-[16px] ${value ? 'text-black' : 'text-gray-400'}`}>
                {value ? formatDate(value, 'DD-MM-YYYY') : label}
              </Text>
            </TouchableOpacity>
            <DatePicker show={showPicker} hidePicker={handleHidePicker} onChangeDate={onChange} />
          </>
        )
      }}
    />
  )
}
