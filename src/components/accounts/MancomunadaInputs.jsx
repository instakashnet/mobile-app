import { View } from 'react-native'
import React from 'react'
import Input from '../UI/Input'
import Select from '../UI/Select'
import { documentOptions } from '../../helpers/select-options'
import Helper from '../UI/Helper'

export default function MancomunadaInputs({ control, active, errors }) {
  return !active ? null : (
    <View>
      <Input name="firstNameJoint" label="Nombre completo" control={control} error={errors.firstNameJoint} />
      <Helper error={errors.firstNameJoint?.message} />
      <View className="mt-1" />
      <View className="flex-row items-center">
        <View className="flex-1 mr-1">
          <Input name="fatherSurname" label="Apellido paterno" control={control} error={errors.fatherSurname} />
        </View>
        <View className="flex-1 ml-1">
          <Input name="motherSurname" label="Apellido materno" control={control} error={errors.motherSurname} />
        </View>
      </View>
      <Helper error={errors.fatherSurname?.message || errors.motherSurname?.message} />
      <View className="mt-1" />
      <View className="flex-row items-center justify-center">
        <View className="flex-[.5] mr-3">
          <Select options={documentOptions} name="documentTypeJoint" control={control} label="Tipo doc" error={errors.documentTypeJoint} />
        </View>
        <View className="flex-1">
          <Input label="Número" name="documentNumberJoint" maxLength={15} control={control} error={errors.documentNumberJoint} />
        </View>
      </View>
      <Helper error={errors.documentTypeJoint?.message || errors.documentNumberJoint?.message} />
    </View>
  )
}
