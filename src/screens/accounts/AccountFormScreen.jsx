import React from 'react'
import { Pressable, View } from 'react-native'
import { Checkbox, Text } from 'react-native-paper'

import MancomunadaInputs from '../../components/accounts/MancomunadaInputs'
import Banner from '../../components/UI/Banner'
import Button from '../../components/UI/Button'
import Helper from '../../components/UI/Helper'
import Input from '../../components/UI/Input'
import Select from '../../components/UI/Select'
import Screen from '../../components/utils/Screen'
import { accountTypesOptions } from '../../helpers/select-options'
import { useAccountForm } from './AccountForm.logic'

export default function AccountFormScreen() {
  const {
    banksOptions,
    currenciesOptions,
    control,
    onSubmit,
    addProcessing,
    editProcessing,
    handleBankSelect,
    handleMacomunada,
    formState: { errors, isValid },
    interbancario,
    joint,
    account,
  } = useAccountForm()

  return (
    <Screen>
      <View className="mt-4" />
      {!account && interbancario && (
        <>
          <Banner type="info">
            <Text>Los cambios realizados desde y/o hacia cuentas interbancarias pueden demorar de 24 a 48 horas.</Text>
          </Banner>
          <View className="mt-6" />
        </>
      )}
      <Select options={banksOptions} label="Banco" control={control} name="bankId" onSelect={handleBankSelect} error={errors.bankId} />
      <Helper error={errors.bankId?.message} />
      <View className="mt-1" />
      <Select options={currenciesOptions} label="Moneda" control={control} name="currencyId" error={errors.currencyId} />
      <Helper error={errors.currencyId?.message} />
      <View className="mt-1" />
      {!interbancario ? (
        <>
          <Input name="account_number" label="Número de cuenta" control={control} error={errors.account_number} maxLength={14} />
          <Helper helper="Deben ser entre 13 y 14 números." error={errors.account_number?.message} />
        </>
      ) : (
        <>
          <Input name="cci" label="Número de CCI" control={control} error={errors.cci} maxLength={20} />
          <Helper helper="Deben ser 20 números." error={errors.cci?.message} />
        </>
      )}
      <View className="mt-4" />
      <Select options={accountTypesOptions} label="Tipo de cuenta" control={control} name="accType" error={errors.accType} />
      <Helper error={errors.accType?.message} />
      <View className="mt-1" />
      <Input name="alias" label="Alias de cuenta" control={control} error={errors.alias} />
      <Helper helper="Ej.: Tu nombre + banco + moneda" error={errors.alias?.message} />
      <Pressable className="flex-row items-center" onPress={handleMacomunada}>
        <Checkbox.Android status={joint ? 'checked' : 'unchecked'} color="#0d8284" />
        <Text>Esta es una cuenta mancomunada.</Text>
      </Pressable>
      <View className="mt-3" />
      <MancomunadaInputs control={control} active={joint} errors={errors} />
      <View className="mt-8" />
      <Button onPress={onSubmit} loading={addProcessing || editProcessing} disabled={!isValid}>
        {account?.id ? 'Editar cuenta' : 'Agregar cuenta'}
      </Button>
    </Screen>
  )
}
