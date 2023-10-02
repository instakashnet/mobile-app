import { Pressable, View } from 'react-native'
import { Checkbox, RadioButton, Text } from 'react-native-paper'

import Screen from '@/components/utils/Screen'
import Select from '@/components/UI/Select'
import { AddAccountLogic } from './AddAccount.logic'
import Input from '@/components/UI/Input'
import { accountTypesOptions, documentOptions, occupationOptions } from '@/helpers/select-options'
import Helper from '@/components/UI/Helper'
import Button from '@/components/UI/Button'
import Card from '@/components/UI/Card'
import MancomunadaInputs from '@/components/accounts/MancomunadaInputs'
import { colors } from '@/theme/colors'
import { PROFILE_TYPES } from '@/constants/PROFILE_TYPES'

function AddThirdPArtyAccountScreen() {
  const {
    control,
    banksOptions,
    currenciesOptions,
    handleBankSelect,
    errors,
    interbancario,
    isValid,
    onSubmit,
    isProcessing,
    handleMacomunada,
    joint,
    thirdAccType,
    handleThirdAccType,
  } = AddAccountLogic('tercero')

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
      <Text variant="titleSmall" className="mt-6 text-lg">
        Datos del tercero
      </Text>
      <Text variant="button" className="mt-3">
        ¿Que tipo de cuenta es?
      </Text>
      <RadioButton.Group onValueChange={handleThirdAccType} value={thirdAccType}>
        <View className="flex-row items-center gap-4 mb-3 w-full">
          <View className="flex-row items-center">
            <Text>Natural</Text>
            <RadioButton.Android color={colors.primary500} value={PROFILE_TYPES.NATURAL} />
          </View>
          <View className="flex-row items-center">
            <Text>Juridica</Text>
            <RadioButton.Android color={colors.primary500} value={PROFILE_TYPES.JURIDICA} />
          </View>
        </View>
      </RadioButton.Group>
      <View className="flex-row items-center justify-center mt-3">
        <View className="flex-[.5] mr-3">
          <Select options={documentOptions} name="documentType" control={control} error={errors.documentType} label="Tipo doc" />
        </View>
        <View className="flex-1">
          <Input label="Número" name="documentIdentity" maxLength={15} error={errors.documentIdentity} control={control} />
        </View>
      </View>
      <Helper error={errors.documentType?.message || errors.documentIdentity?.message} />
      {thirdAccType === PROFILE_TYPES.NATURAL && (
        <>
          <Input containerClasses="mt-6" name="firstName" label="Nombre(s)" control={control} error={errors.firstNameJoint?.message} />
          <Input containerClasses="mt-6" name="lastName" label="Apellido(s)" control={control} error={errors.lastNameJoint?.message} />
          <Select containerClasses="mt-6" options={occupationOptions} name="job" control={control} error={errors.job} label="Ocupación" />
        </>
      )}
      {thirdAccType === PROFILE_TYPES.JURIDICA && (
        <Input containerClasses="mt-6" name="razonSocial" label="Razón social" control={control} error={errors.razonSocial?.message} />
      )}
      <Input
        containerClasses="mt-6"
        name="email"
        autoComplete="email"
        autoCapitalize="none"
        label="Correo electrónico"
        control={control}
        error={errors.email?.message}
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

export default AddThirdPArtyAccountScreen
