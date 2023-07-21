import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { getBanksOptions, getCurrenciesOptions } from '../../helpers/select-options'
import { addAccountSchema } from '../../schemas/accounts'
import { useAddAccountMutation, useEditAccountMutation } from '../../services/account'
import { selectBanks, selectCurrencies } from '../../store/slices/appData'

export function useAccountForm() {
  const [joint, setJoint] = useState(false)
  const route = useRoute()
  const { goBack } = useNavigation()
  const [interbancario, setInterbancario] = useState(false)
  const [addAccount, { isLoading: addProcessing }] = useAddAccountMutation()
  const [editAccount, { isLoading: editProcessing }] = useEditAccountMutation()
  const banks = useSelector(selectBanks)
  const currencies = useSelector(selectCurrencies)
  const banksOptions = useMemo(() => getBanksOptions(banks) ?? [], [banks])
  const currenciesOptions = useMemo(() => getCurrenciesOptions(currencies) ?? [], [currencies])
  const account = route.params?.account

  const { control, handleSubmit, formState, setValue } = useForm({
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
      return goBack()
    } catch (error) {
      console.error(error)
    }
  }

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    formState,
    banksOptions,
    currenciesOptions,
    addProcessing,
    editProcessing,
    handleBankSelect,
    handleMacomunada,
    interbancario,
    joint,
    account,
  }
}
