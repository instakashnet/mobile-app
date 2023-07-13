import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'

import { occupationOptions } from '../../helpers/select-options'
import { addAdditionalInfoSchema } from '../../schemas/verification'
import { useAddAdditionalInfoMutation } from '../../services/user'
import { selectUser } from '../../store/slices/authSlice'
import Button from '../UI/Button'
import Checkbox from '../UI/Checkbox'
import DateInput from '../UI/DateInput'
import Helper from '../UI/Helper'
import Input from '../UI/Input'
import Select from '../UI/Select'

export default function OccupationForm() {
  const user = useSelector(selectUser)
  const navigation = useNavigation()
  const [activeInput, setActiveInput] = useState(false)
  const [addAdditionalInfo, { isLoading }] = useAddAdditionalInfoMutation()

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      job: '',
      occupation: '',
      profession: '',
      date_birth: null,
      profileId: user?.profileId,
      type: 'natural',
      pep: false,
    },
    mode: 'onTouched',
    resolver: yupResolver(addAdditionalInfoSchema),
  })

  const handleOccupationSelect = value => {
    setValue('occupation', value)
    if (value === 'otro') {
      setValue('job', '')
      return setActiveInput(true)
    } else {
      setValue('job', value, { shouldValidate: true })
      return setActiveInput(false)
    }
  }

  const onSubmit = async values => {
    try {
      await addAdditionalInfo(values).unwrap()
      navigation.navigate('Document')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View className="flex-1">
      <Select name="occupation" options={occupationOptions} control={control} label="Ocupación" onSelect={handleOccupationSelect} />
      {activeInput && (
        <>
          <View className="mt-6" />
          <Input name="job" control={control} label="Ocupación" error={errors.job} />
        </>
      )}
      <Helper error={errors.job?.message} />
      <View className="mt-2" />
      <Input name="profession" control={control} label="Profesión" error={errors.profession} />
      <Helper error={errors.profession?.message} />
      <View className="mt-2" />
      <DateInput name="date_birth" label="Fecha de nacimiento" control={control} error={errors?.date_birth} />
      <Helper error={errors.date_birth?.message} />
      <Checkbox name="pep" control={control}>
        <Text className="flex-1 flex-wrap">Declaro ser una persona expuesta políticamente (PEP)</Text>
      </Checkbox>
      <View className="mt-auto" />
      <Button onPress={handleSubmit(onSubmit)} loading={isLoading} disabled={!isValid}>
        Continuar
      </Button>
      <View className="mt-3" />
      <Button variant="secondary" onPress={() => navigation.popToTop()}>
        Volver al inicio
      </Button>
    </View>
  )
}
