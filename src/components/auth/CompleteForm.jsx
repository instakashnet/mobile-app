import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

import { documentOptions, sexOptions } from '../../helpers/select-options'
import Button from '../UI/Button'
import Checkbox from '../UI/Checkbox'
import Helper from '../UI/Helper'
import Input from '../UI/Input'
import PhoneInput from '../UI/PhoneInput'
import Select from '../UI/Select'
import { useCompleteForm } from './CompleteForm.logic'

export default function CompleteForm() {
  const {
    control,
    formState: { errors, isValid },
    isLoading,
    onSubmit,
  } = useCompleteForm()

  return (
    <View className="mt-6">
      <Input label="Nombre(s)" error={errors.first_name} name="first_name" control={control} />
      <Helper error={errors.first_name?.message} />
      <View className="mt-1" />
      <Input label="Apellido(s)" error={errors.last_name} name="last_name" control={control} />
      <Helper error={errors.last_name?.message} />
      <View className="mt-1" />
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
      <Select options={sexOptions} name="identity_sex" control={control} error={errors.identity_sex} label="Género" />
      <Helper error={errors.identity_sex?.message} />
      <View className="mt-1" />
      <PhoneInput label="Teléfono" name="phone" error={errors.phone} control={control} maxLength={15} />
      <Helper error={errors.phone?.message} />
      <View>
        <Checkbox control={control} name="accept">
          <Text variant="caption" className="mr-1">
            Declaro que la información es correcta y me hago responsable por su legitimidad.
          </Text>
        </Checkbox>
      </View>
      <View className="mt-4" />
      <Button onPress={onSubmit} disabled={!isValid} loading={isLoading}>
        Continuar
      </Button>
    </View>
  )
}
