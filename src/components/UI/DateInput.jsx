import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import { DatePickerModal } from 'react-native-paper-dates'

import { formatDate } from '../../helpers/formatters'

export default function DateInput({ control, name, label, error }) {
  const [open, setOpen] = useState(false)

  const handleDismiss = () => setOpen(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <>
            <Pressable
              onPress={() => setOpen(true)}
              className={`bg-white w-full h-[49px] px-4 rounded-lg border-2 ${
                error ? 'border-red-300' : 'border-gray-300'
              } justify-center`}>
              <Text className={`text-[16px] ${value ? 'text-black' : 'text-gray-400'}`}>
                {value ? formatDate(value, 'DD-MM-YYYY') : label}
              </Text>
            </Pressable>
            <DatePickerModal
              locale="es"
              mode="single"
              visible={open}
              onDismiss={handleDismiss}
              date={value}
              onConfirm={value => {
                onChange(value.date)
                handleDismiss()
              }}
            />
          </>
        )
      }}
    />
  )
}
