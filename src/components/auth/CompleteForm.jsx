import { View } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'

import Select from '../UI/Select'
import Input from '../UI/Input'
import Button from '../UI/Button'
import { documentOptions, sexOptions } from '../../helpers/select-options'
import Helper from '../UI/Helper'
import { completeValidationSchema } from '../../schemas/auth'
import PhoneInput from '../UI/PhoneInput'
import { useCompleteRegistrationMutation, useLazyGetSessionQuery } from '../../services/auth'
import { showAlert } from '../../store/slices/alert'
import { setCredentials } from '../../store/slices/authSlice'

export default function CompleteForm() {
  const [completeRegistration, { isLoading }] = useCompleteRegistrationMutation()
  const [getSession] = useLazyGetSessionQuery()
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      type: 'natural',
      first_name: '',
      last_name: '',
      identity_sex: '',
      phone: '',
      document_type: 'DNI',
      document_identification: '',
    },
    mode: 'onTouched',
    resolver: yupResolver(completeValidationSchema),
  })

  const onSubmit = async values => {
    try {
      await completeRegistration(values).unwrap()
      const sessionResponse = await getSession().unwrap()

      dispatch(setCredentials({ accessToken: sessionResponse.data.accessToken, user: sessionResponse.data.user }))
    } catch (error) {
      dispatch(showAlert({ type: 'error', message: error.message }))
    }
  }

  return (
    <View className="mt-8">
      <View className="flex-row items-center justify-center">
        <View className="flex-[.5] mr-3">
          <Select options={documentOptions} name="document_type" control={control} error={errors.document_type} label="Tipo doc" />
        </View>
        <View className="flex-1">
          <Input label="Número" name="document_identification" maxLength={15} error={errors.document_identification} control={control} />
        </View>
      </View>
      <Helper error={errors.document_type?.message || errors.document_identification?.message} />
      <View className="mt-1" />
      <Input label="Nombre(s)" error={errors.first_name} name="first_name" control={control} />
      <Helper error={errors.first_name?.message} />
      <View className="mt-1" />
      <Input label="Apellido(s)" error={errors.last_name} name="last_name" control={control} />
      <Helper error={errors.last_name?.message} />
      <View className="mt-1" />
      <Select options={sexOptions} name="identity_sex" control={control} error={errors.identity_sex} label="Género" />
      <Helper error={errors.identity_sex?.message} />
      <View className="mt-1" />
      <PhoneInput label="Teléfono" name="phone" error={errors.phone} control={control} maxLength={15} />
      <Helper error={errors.phone?.message} />
      <View className="mt-4" />
      <Button onPress={handleSubmit(onSubmit)} disabled={!isValid} loading={isLoading}>
        Continuar
      </Button>
    </View>
  )
}
