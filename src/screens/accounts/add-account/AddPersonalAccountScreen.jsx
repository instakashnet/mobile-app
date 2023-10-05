import { Pressable, View } from 'react-native'
import { Checkbox } from 'react-native-paper'

import Banner from '@/components/UI/Banner'
import Button from '@/components/UI/Button'
import Input from '@/components/UI/Input'
import Select from '@/components/UI/Select'
import MancomunadaInputs from '@/components/accounts/MancomunadaInputs'
import Screen from '@/components/utils/Screen'
import Text from '@/components/utils/Text'
import { AddAccountLogic } from './AddAccount.logic'
import { accountTypesOptions } from '@/helpers/select-options'
import Card from '@/components/UI/Card'

function AddPersonalAccountScreen() {
  const {
    control,
    handleBankSelect,
    handleMacomunada,
    banksOptions,
    errors,
    isValid,
    currenciesOptions,
    interbancario,
    joint,
    onSubmit,
    isProcessing,
  } = AddAccountLogic()

  return (
    <Screen>
      <View className="mt-4" />
      <Banner type="info">
        <Text>Los cambios realizados desde y/o hacia cuentas interbancarias pueden demorar de 24 a 48 horas.</Text>
      </Banner>
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
          containerClasses="mt-6"
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
      <Card cardClasses="py-3 mt-4">
        <Pressable className="flex-row items-center" onPress={handleMacomunada}>
          <Checkbox.Android status={joint ? 'checked' : 'unchecked'} color="#0d8284" />
          <Text>Es una cuenta mancomunada</Text>
        </Pressable>
      </Card>
      <View className="mt-3" />
      <MancomunadaInputs control={control} active={joint} errors={errors} />
      <View className="mt-8" />
      <Button onPress={onSubmit} loading={isProcessing} disabled={!isValid}>
        Agregar cuenta
      </Button>
    </Screen>
  )
}

export default AddPersonalAccountScreen
