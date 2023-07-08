import { Pressable, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox, Text } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from '../../components/UI/Button'
import Select from '../../components/UI/Select'
import Input from '../../components/UI/Input'
import { selectBanks, selectCurrencies } from '../../store/slices/app-data'
import Helper from '../../components/UI/Helper'
import MancomunadaInputs from '../../components/accounts/MancomunadaInputs'
import { accountTypesOptions, getBanksOptions, getCurrenciesOptions } from '../../helpers/select-options'
import { addAccountSchema } from '../../schemas/accounts'
import { useAddAccountMutation, useEditAccountMutation } from '../../services/account'

export default function AccountFormScreen({ navigation, route }) {
  const [joint, setJoint] = useState(false)
  const [interbancario, setInterbancario] = useState(false)
  const [addAccount, { isLoading }] = useAddAccountMutation()
  const [editAccount, { isLoading: editLoading }] = useEditAccountMutation()
  const banks = useSelector(selectBanks)
  const currencies = useSelector(selectCurrencies)
  const banksOptions = useMemo(() => getBanksOptions(banks) ?? [], [banks])
  const currenciesOptions = useMemo(() => getCurrenciesOptions(currencies) ?? [], [currencies])
  const account = route.params?.account

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      account_number: account?.accNumber ?? '',
      cci: account?.cci ?? '',
      bankId: account?.bank?.id || null,
      isDirect: account?.bank?.isDirect || true,
      currencyId: account?.currency?.id || null,
      alias: account?.alias ?? '',
      accType: account?.accType ?? '',
      accept: false,
      joint: account?.joint || false,
      firstNameJoint: account?.firstName ?? '',
      fatherSurname: account?.lastName?.split(' ')[0] ?? '',
      motherSurname: '',
      documentTypeJoint: '',
      documentNumberJoint: '',
    },
    mode: 'onTouched',
    resolver: yupResolver(addAccountSchema),
  })

  const handleMacomunada = () => {
    setJoint(prev => !prev)
    setValue('joint', !joint, { shouldValidate: true })
  }
  const handleBankSelect = value => {
    setValue('isDirect', true)
    setInterbancario(false)
    if (!value) return

    const selectedBank = banks.find(bank => bank.id === value)
    if (!selectedBank?.active) {
      setInterbancario(true)
      setValue('isDirect', false)
    }
  }
  const onSubmit = async values => {
    const accountValues = {
      ...values,
      accType: values?.accType === 'ahorros' ? 'savings' : 'checking',
      lastNameJoint: values.joint ? values.fatherSurname + ' ' + values.motherSurname : '',
    }

    try {
      if (account?.id) {
        await editAccount({ values: accountValues, id: account?.id }).unwrap()
      } else {
        await addAccount(accountValues).unwrap()
      }
      return navigation.goBack()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <KeyboardAwareScrollView>
      <View className="flex-1 mt-4 px-6 pb-6">
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
        <Button onPress={handleSubmit(onSubmit)} loading={isLoading || editLoading} disabled={!isValid}>
          {account?.id ? 'Editar cuenta' : 'Agregar cuenta'}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  )
}
