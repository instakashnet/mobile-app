import { View } from 'react-native'
import React from 'react'

import Input from '../UI/Input'
import Select from '../UI/Select'
import { documentOptions } from '../../helpers/select-options'
import Helper from '../UI/Helper'

export default function MancomunadaInputs({ control, active, errors }) {
  return !active ? null : (
    <View>
      <Input containerClasses="mt-3" name="firstNameJoint" label="Nombre(s)" control={control} error={errors.firstNameJoint?.message} />
      <Input containerClasses="mt-6" name="lastNameJoint" label="Apellido(s)" control={control} error={errors.lastNameJoint?.message} />
      <View className="flex-row items-center justify-center mt-6">
        <View className="flex-[.5] mr-3">
          <Select options={documentOptions} name="documentTypeJoint" control={control} label="Tipo doc" />
        </View>
        <View className="flex-1">
          <Input label="Número" name="documentNumberJoint" maxLength={15} control={control} />
        </View>
      </View>
      <Helper error={errors.documentTypeJoint?.message || errors.documentNumberJoint?.message} />
    </View>
  )
}
