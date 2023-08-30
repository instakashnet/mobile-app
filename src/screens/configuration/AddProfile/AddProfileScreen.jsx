import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Text, useTheme } from 'react-native-paper'

import Banner from '../../../components/UI/Banner'
import Button from '../../../components/UI/Button'
import Checkbox from '../../../components/UI/Checkbox'
import ControlledInput from '../../../components/UI/controlledInputs/Input'
import Helper from '../../../components/UI/Helper'
import Input from '../../../components/UI/Input'
import Screen from '../../../components/utils/Screen'
import { useAddProfile } from './AddProfile.logic'

export default function AddProfileScreen() {
  const { colors } = useTheme()
  const {
    control,
    ruc,
    rucInfo,
    handleRucChange,
    formState: { errors, isValid },
    isLoading,
    isProcessing,
    onSubmit,
  } = useAddProfile()

  return (
    <Screen containerClasses="pb-6">
      <Banner type="info">
        <Text>Los perfiles empresas te ayudan a realizar cambio a nombre de estas empresas.</Text>
      </Banner>
      <View className="mt-6" />
      <Text variant="button">Datos de la empresa</Text>
      <View className="mt-3" />
      <ControlledInput label="Ingresa el RUC" value={ruc} onChange={handleRucChange} keyboardType="number-pad" />
      <Helper error={errors.ruc?.message} />
      <View className="mt-1" />
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={colors.primary700} size="large" />
        </View>
      ) : rucInfo ? (
        <>
          <Input name="razon_social" control={control} label="Razón social" error={errors.razon_social} />
          <Helper error={errors.razon_social?.message} />
          <Input
            name="address"
            control={control}
            className="min-h-[80px]"
            label="Dirección discal"
            error={errors.address}
            multiline
            numberOfLines={4}
          />
          <Helper error={errors.address?.message} />
          <Checkbox control={control} name="accept">
            <Text variant="caption">Declaro que soy el representante legal o persona autorizada de la empresa.</Text>
          </Checkbox>
          <View className="mt-3" />
          <Button onPress={onSubmit} loading={isProcessing} disabled={!isValid}>
            Agregar empresa
          </Button>
          <View className="mb-8" />
        </>
      ) : null}
    </Screen>
  )
}
