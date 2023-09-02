import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, View } from 'react-native'
import Toast from 'react-native-toast-message'

import SelectAccount from '../../components/accounts/SelectAccount'
import SelectAccountModal from '../../components/accounts/SelectAccountModal'
import Button from '../../components/UI/Button'
import KashAmountInput from '../../components/UI/controlledInputs/KashAmountInput'
import Helper from '../../components/UI/Helper'
import Container from '../../components/utils/Container'
import DismissKeyboard from '../../components/utils/DismissKeyboard'
import KeyboardView from '../../components/utils/KeyboardView'
import { formatAmount } from '../../helpers/formatters'
import { withdrawKashSchema } from '../../schemas/kash'
import { useWithdrawKashMutation } from '../../services/user'
import Text from '@/components/utils/Text'

function WithdrawKashScreen({ route, navigation }) {
  const kashAmount = route.params?.kashAmount || 0
  const [showList, setShowList] = useState(false)
  const [accSelected, setAccSelected] = useState(null)
  const [withdrawKash, { isLoading }] = useWithdrawKashMutation()
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      kashQty: '',
      accountId: null,
    },
    resolver: yupResolver(withdrawKashSchema),
    mode: 'onTouched',
  })

  const handleSelectAccount = account => {
    setAccSelected(account)
    setValue('accountId', account.id, { shouldValidate: true })
  }

  const onSubmit = async values => {
    const kashToWithdraw = parseFloat(values.kashQty)
    if (kashToWithdraw > kashAmount) return Alert.alert('No tienes fondos', 'No tienes suficientes KASH para retirar')

    try {
      await withdrawKash({ ...values, kashQty: kashToWithdraw }).unwrap()
      Toast.show({ type: 'success', text1: 'Retiro creado', text2: 'Tu solicitud de retiro de KASH ha sido recibida' })
      return navigation.navigate('Operations')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <KeyboardView>
      <Container>
        <DismissKeyboard>
          <View className="flex-1">
            <Text variant="titleLarge" className="mb-1 mt-6">
              ¿Cuanto deseas retirar?
            </Text>
            <Text>Puedes retirar tus KASH ganados a cualquiera de tus cuentas en dólares.</Text>
            <View className="mt-6" />
            <Controller
              control={control}
              name="kashQty"
              render={({ field: { value, onChange } }) => <KashAmountInput amount={kashAmount} onChange={onChange} value={value} />}
            />
            <View className="items-center">
              <Helper error={errors.kashQty?.message} />
            </View>
            <Text className="text-center text-gray-500 mt-2">
              {kashAmount} KASH disponibles = {formatAmount(kashAmount, '$')}
            </Text>
            <View className="mt-8" />
            <Text className="mb-2">¿Donde recibirás tus KASH?</Text>
            <SelectAccount onPress={() => setShowList(true)} name="account" accSelected={accSelected} />
            <Helper error={errors.accountId?.message} />
            <View className="mt-auto" />
            <Button disabled={!isValid} loading={isLoading} onPress={handleSubmit(onSubmit)}>
              Retirar
            </Button>
          </View>
        </DismissKeyboard>
      </Container>
      <SelectAccountModal currencyId={1} onClose={() => setShowList(false)} onSelect={handleSelectAccount} isVisible={showList} />
    </KeyboardView>
  )
}

export default WithdrawKashScreen
