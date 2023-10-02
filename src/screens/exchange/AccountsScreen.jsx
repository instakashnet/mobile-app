import { yupResolver } from '@hookform/resolvers/yup'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, ScrollView, View } from 'react-native'

import SelectAccount from '../../components/accounts/SelectAccount'
import SelectAccountModal from '../../components/accounts/SelectAccountModal'
import Button from '../../components/UI/Button'
import Helper from '../../components/UI/Helper'
import Select from '../../components/UI/Select'
import Container from '../../components/utils/Container'
import StepsBar from '../../components/utils/StepsBar'
import { fundsOriginOptions } from '../../helpers/select-options'
import { selectAccountsSchema } from '../../schemas/exchange'
import { useCancelExchangeMutation, useContinueExchangeMutation } from '../../services/exchange'
import { exchangeSteps } from '../../utils/exchange-steps'
import Text from '@/components/utils/Text'
import { ACCOUNT_TYPES } from '@/constants/ACCOUNT_TYPES'

export default function AccountsScreen({ navigation, route }) {
  const order = route?.params?.order
  const [showList, setShowList] = useState(false)
  const [accInfo, setAccInfo] = useState(null)
  const [accType, setAccType] = useState(ACCOUNT_TYPES.PERSONAL)
  const [accountsSelected, setAccountsSelected] = useState(null)
  const [cancelExchange, { isLoading: cancelProcessing }] = useCancelExchangeMutation()
  const [continueExchange, { isLoading: isProcessing }] = useContinueExchangeMutation()
  const {
    setValue,
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      account_to_id: null,
      account_from_id: null,
      funds_origin: '',
      kashApplied: 'no',
      kashUsed: '',
    },
    resolver: yupResolver(selectAccountsSchema),
  })

  const handleSelectAccount = useCallback(
    account => {
      setValue(accInfo?.name, account?.id, { shouldValidate: true })
      setAccountsSelected(prev => ({
        ...prev,
        [accInfo?.name]: account,
      }))
    },
    [accInfo, setValue],
  )

  const handleOpen = (name, type) => {
    setAccInfo({ name, currencyId: name === 'account_from_id' ? order?.currencySentId : order?.currencyReceivedId })
    setAccType(type)
    setShowList(true)
  }

  const onSubmit = async values => {
    try {
      const updatedOrder = await continueExchange({ values, orderId: order?.id }).unwrap()
      navigation.navigate('Transfer', { order: updatedOrder })
    } catch (error) {
      if (error?.data?.error?.code === 'C4006')
        return Alert.alert(
          '¡Lo sentimos!',
          'En estos momentos no podemos aceptar tu pedido para el banco que esperas recibir. Por favor, intenta más tarde o contacta a soporte..',
        )
      console.log(error)
    }
  }

  const handleCancelExchange = async () => {
    try {
      await cancelExchange({ orderId: order?.id, cancelType: 'draft' }).unwrap()
      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView>
      <Container>
        <StepsBar steps={exchangeSteps} />
        <View className="flex-1 w-full mt-8">
          <Text variant="titleLarge" className="mb-1 text-center">
            Selecciona tus cuentas
          </Text>
          <Text className="text-center">Debes seleccionar tu cuenta de origen y de destino para tu cambio.</Text>
          <View className="mt-7" />
          <Text className="mb-2 ml-1">¿Desde que cuenta nos envías?</Text>
          <SelectAccount
            accSelected={accountsSelected?.account_from_id}
            onPress={() => handleOpen('account_from_id', ACCOUNT_TYPES.PERSONAL)}
          />
          <Helper error={errors.account_from_id?.message} />
          <View className="mt-4" />
          <Text className="mb-2 ml-1">¿En que cuenta recibes?</Text>
          <SelectAccount accSelected={accountsSelected?.account_to_id} onPress={() => handleOpen('account_to_id', null)} />
          <Helper error={errors.account_to_id?.message} />
          <Button variant="secondary" className="w-full mt-6" onPress={() => navigation.navigate('AddAccount')}>
            Agregar cuenta
          </Button>
          <View className="mt-6" />
          <Select
            control={control}
            name="funds_origin"
            label="Origen de los fondos"
            error={errors.funds_origin}
            options={fundsOriginOptions}
          />
          <Helper error={errors.funds_origin?.message} />
          <View className="mt-6" />
          <Button className="w-full" disabled={!isValid} loading={isProcessing} onPress={handleSubmit(onSubmit)}>
            Continuar
          </Button>
          <View className="mt-4" />
          <Button variant="secondary" loading={cancelProcessing} onPress={handleCancelExchange}>
            Cancelar
          </Button>
        </View>
        <SelectAccountModal
          currencyId={accInfo?.currencyId}
          onClose={() => setShowList(false)}
          onSelect={handleSelectAccount}
          isVisible={showList}
          accType={accType}
        />
      </Container>
    </ScrollView>
  )
}
