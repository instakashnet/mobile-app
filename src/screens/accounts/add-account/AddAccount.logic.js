import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { getBanksOptions, getCurrenciesOptions } from '@/helpers/select-options'
import { addAccountSchema } from '@/schemas/accounts'
import { useAddAccountMutation } from '@/services/account'
import { selectBanks, selectCurrencies } from '@/store/slices/appData'
import { addAccountFormFields } from '@/contracts/forms/addAccountFormFields'
import { PROFILE_TYPES } from '@/constants/PROFILE_TYPES'

export function AddAccountLogic(accType = 'personal') {
  const [joint, setJoint] = useState(false)
  const [thirdAccType, setThirdAccType] = useState('natural')
  const { goBack } = useNavigation()
  const [interbancario, setInterbancario] = useState(false)
  const [addAccount, { isLoading: isProcessing }] = useAddAccountMutation()
  const banks = useSelector(selectBanks)
  const currencies = useSelector(selectCurrencies)
  const banksOptions = useMemo(() => getBanksOptions(banks) ?? [], [banks])
  const currenciesOptions = useMemo(() => getCurrenciesOptions(currencies) ?? [], [currencies])

  const defaultValues = {
    ...addAccountFormFields,
    isThird: accType === 'tercero',
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues,
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
      await addAccount(accountValues).unwrap()
      return goBack()
    } catch (error) {
      console.error(error)
    }
  }

  const handleThirdAccType = value => {
    setThirdAccType(value)
    setValue('thirdPartyAccType', value, { shouldValidate: true })

    if (value === PROFILE_TYPES.JURIDICA) {
      setValue('documentType', 'RUC')
    } else {
      setValue('documentType', '')
    }
  }

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    banksOptions,
    currenciesOptions,
    isProcessing,
    handleBankSelect,
    handleMacomunada,
    interbancario,
    joint,
    thirdAccType,
    handleThirdAccType,
  }
}
