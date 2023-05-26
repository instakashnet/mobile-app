import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Input from '../UI/Input'
import Select from '../UI/Select'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/slices/authSlice'
import Helper from '../UI/Helper'
import { occupationOptions } from '../../helpers/select-options'
import DateInput from '../UI/DateInput'
import Checkbox from '../UI/Checkbox'
import Button from '../UI/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { addAdditionalInfoSchema } from '../../schemas/verification'
import { useAddAdditionalInfoMutation } from '../../services/user'

export default function OccupationForm({ navigate }) {
  const user = useSelector(selectUser)
  const [activeInput, setActiveInput] = useState(false)
  const [addAdditionalInfo, { isLoading }] = useAddAdditionalInfoMutation()

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      job: '',
      occupation: '',
      profession: '',
      date_birth: null,
      profileId: user?.profileId,
      type: 'natural',
      pep: false
    },
    mode: 'onTouched',
    resolver: yupResolver(addAdditionalInfoSchema)
  })

  const handleOccupationSelect = (value) => {
    setValue('occupation', value)
    if (value === 'otro') {
      setValue('job', '')
      return setActiveInput(true)
    } else {
      setValue('job', value, { shouldValidate: true })
      return setActiveInput(false)
    }
  }

  const onSubmit = async (values) => {
    try {
      await addAdditionalInfo(values).unwrap()
      navigate('Document')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View className='flex-1'>
      <Select name='occupation' options={occupationOptions} control={control} label='Ocupación' onSelect={handleOccupationSelect} />
      {activeInput && (
        <>
          <View className='mt-6' />
          <Input name='job' control={control} label='Ocupación' error={errors.job} />
        </>
      )}
      <Helper error={errors.job?.message} />
      <View className='mt-2' />
      <Input name='profession' control={control} label='Profesión' error={errors.profession} />
      <Helper error={errors.profession?.message} />
      <View className='mt-2' />
      <DateInput name='date_birth' label='Fecha de nacimiento' control={control} error={errors?.date_birth} />
      <Helper error={errors.date_birth?.message} />
      <Checkbox name='pep' control={control}>
        <Text className='flex-1 flex-wrap'>Declaro ser una persona expuesta políticamente (PEP)</Text>
      </Checkbox>
      <View className='mt-auto' />
      <Button onPress={handleSubmit(onSubmit)} loading={isLoading} disabled={!isValid}>
        Continuar
      </Button>
    </View>
  )
}
