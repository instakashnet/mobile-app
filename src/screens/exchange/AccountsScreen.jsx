import { View, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import Container from '../../components/utils/Container'
import { Text } from 'react-native-paper'
import SelectAccountModal from '../../components/accounts/SelectAccountModal'
import SelectAccount from '../../components/accounts/SelectAccount'
import StepsBar from '../../components/utils/StepsBar'
import { exchangeSteps } from '../../utils/exchange-steps'
import { useForm } from 'react-hook-form'
import Button from '../../components/UI/Button'
import { useContinueExchangeMutation, useCancelExchangeMutation } from '../../services/exchange'
import Select from '../../components/UI/Select'
import { fundsOriginOptions } from '../../helpers/select-options'
import { yupResolver } from '@hookform/resolvers/yup'
import { selectAccountsSchema } from '../../schemas/exchange'
import Helper from '../../components/UI/Helper'

export default function AccountsScreen({ navigation, route }) {
  const order = route?.params?.order
  const [showList, setShowList] = useState(false)
  const [accType, setAccType] = useState(null)
  const [accountsSelected, setAccountsSelected] = useState(null)
  const [cancelExchange, { isLoading: cancelProcessing }] = useCancelExchangeMutation()
  const [continueExchange, { isLoading: isProcessing }] = useContinueExchangeMutation()
  const {
    setValue,
    control,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({
    defaultValues: {
      account_to_id: null,
      account_from_id: null,
      funds_origin: '',
      kashApplied: 'no',
      kashUsed: ''
    },
    resolver: yupResolver(selectAccountsSchema)
  })

  const handleSelectAccount = useCallback(
    (account) => {
      setValue(accType?.name, account?.id, { shouldValidate: true })
      setAccountsSelected((prev) => ({
        ...prev,
        [accType?.name]: account
      }))
    },
    [accType]
  )

  const handleOpen = (type) => {
    setAccType({ name: type, currencyId: type === 'account_from_id' ? order?.currencySentId : order?.currencyReceivedId })
    setShowList(true)
  }

  const onSubmit = async (values) => {
    try {
      const updatedOrder = await continueExchange({ values, orderId: order?.id }).unwrap()
      navigation.navigate('Transfer', { order: updatedOrder })
    } catch (error) {
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
        <View className='flex-1 w-full mt-8'>
          <Text variant='titleLarge' className='mb-1 text-center'>
            Selecciona tus cuentas
          </Text>
          <Text className='text-center'>Debes seleccionar tu cuenta de origen y de destino para tu cambio.</Text>
          <View className='mt-7' />
          <Text className='mb-2 ml-1'>Desde que cuenta nos envías?</Text>
          <SelectAccount name='account_from_id' accSelected={accountsSelected?.account_from_id} onPress={handleOpen} />
          <Helper error={errors.account_from_id?.message} />
          <Text className='mb-2 ml-1'>En que cuenta recibes?</Text>
          <SelectAccount name='account_to_id' accSelected={accountsSelected?.account_to_id} onPress={handleOpen} />
          <Helper error={errors.account_to_id?.message} />
          <Button variant='secondary' className='w-full' onPress={() => navigation.navigate('AddAccount')}>
            Agregar cuenta
          </Button>
          <View className='mt-6' />
          <Select
            control={control}
            name='funds_origin'
            label='Origen de los fondos'
            error={errors.funds_origin}
            options={fundsOriginOptions}
          />
          <Helper error={errors.funds_origin?.message} />
          <View className='mt-6' />
          <Button className='w-full' disabled={!isValid} loading={isProcessing} onPress={handleSubmit(onSubmit)}>
            Continuar
          </Button>
          <View className='mt-4' />
          <Button variant='secondary' loading={cancelProcessing} onPress={handleCancelExchange}>
            Cancelar
          </Button>
        </View>
        <SelectAccountModal
          currencyId={accType?.currencyId}
          onClose={() => setShowList(false)}
          onSelect={handleSelectAccount}
          isVisible={showList}
        />
      </Container>
    </ScrollView>
  )
}