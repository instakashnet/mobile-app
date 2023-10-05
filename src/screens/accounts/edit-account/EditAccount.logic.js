import { useNavigation, useRoute } from '@react-navigation/native'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'

import { getBanksOptions, getCurrenciesOptions } from '@/helpers/select-options'
import { useEditAccountMutation } from '@/services/account'
import { selectBanks, selectCurrencies } from '@/store/slices/appData'

export function EditAccountLogic() {
  const [interbancario, setInterbancario] = useState(false)
  const route = useRoute()
  const account = route.params?.account
  const banks = useSelector(selectBanks)
  const currencies = useSelector(selectCurrencies)
  const { goBack } = useNavigation()
  const banksOptions = useMemo(() => getBanksOptions(banks) ?? [], [banks])
  const currenciesOptions = useMemo(() => getCurrenciesOptions(currencies) ?? [], [currencies])
  const [editAccount, { isLoading: isProcessing }] = useEditAccountMutation()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      accType: account?.accType || '',
      account_number: account?.accNumber || '',
      alias: account?.alias || '',
      bankId: account?.bank?.id || null,
      cci: account?.cci || '',
      currencyId: account?.currency?.id || null,
      isDirect: account?.bank?.isDirect || false,
    },
  })

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

  const onSubmit = handleSubmit(async values => {
    try {
      await editAccount({ values, id: account?.id }).unwrap()
      Toast.show({
        type: 'success',
        text1: 'Cuenta editada',
        text2: 'La cuenta se editó correctamente',
      })
      return goBack()
    } catch (error) {
      console.error(error)
    }
  })

  return {
    interbancario,
    banksOptions,
    currenciesOptions,
    control,
    errors,
    handleBankSelect,
    isProcessing,
    isValid,
    onSubmit,
  }
}
