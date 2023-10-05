import { View } from 'react-native'

import Input from '@/components/UI/Input'
import Select from '@/components/UI/Select'
import Screen from '@/components/utils/Screen'
import { accountTypesOptions } from '@/helpers/select-options'
import Button from '@/components/UI/Button'
import { EditAccountLogic } from './EditAccount.logic'

function EditAccountScreen() {
  const { control, banksOptions, handleBankSelect, errors, isValid, isProcessing, currenciesOptions, interbancario, onSubmit } =
    EditAccountLogic()

  return (
    <Screen>
      <Select
        containerClasses="mt-6"
        options={banksOptions}
        label="Banco"
        control={control}
        name="bankId"
        onSelect={handleBankSelect}
        error={errors.bankId?.message}
      />
      <Select
        containerClasses="mt-6"
        options={currenciesOptions}
        label="Moneda"
        control={control}
        name="currencyId"
        error={errors.currencyId?.message}
      />
      {!interbancario ? (
        <Input
          containerClasses="mt-6"
          name="account_number"
          label="Número de cuenta"
          control={control}
          error={errors.account_number?.message}
          maxLength={14}
          helper="Deben ser entre 13 a 14 dígitos"
        />
      ) : (
        <Input
          containerClasses="mt-4"
          name="cci"
          label="Número de CCI"
          control={control}
          error={errors.cci?.message}
          maxLength={20}
          helper="Deben ser 20 dígitos"
        />
      )}
      <Select
        containerClasses="mt-6"
        options={accountTypesOptions}
        label="Tipo de cuenta"
        control={control}
        name="accType"
        error={errors.accType?.message}
      />
      <Input
        containerClasses="mt-6"
        name="alias"
        label="Alias de cuenta"
        control={control}
        helper="Ej.: Tu nombre + banco + moneda"
        error={errors.alias?.message}
      />
      <View className="mt-8" />
      <Button onPress={onSubmit} loading={isProcessing} disabled={!isValid}>
        Editar cuenta
      </Button>
    </Screen>
  )
}

export default EditAccountScreen
