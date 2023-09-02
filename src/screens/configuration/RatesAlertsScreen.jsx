import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Toast from 'react-native-toast-message'

import Rates from '../../components/calculator/Rates'
import Button from '../../components/UI/Button'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'
import Switch from '../../components/UI/Swtich'
import Container from '../../components/utils/Container'
import DismissKeyboard from '../../components/utils/DismissKeyboard'
import KeyboardView from '../../components/utils/KeyboardView'
import { useRates } from '../../hooks/calculator/useRates'
import { useGetRatesNotificationsQuery, useSaveRatesNotificationsMutation } from '../../services/notifications'
import Text from '@/components/utils/Text'

function RatesAlertsScreen() {
  const { data, isLoading: alertsLoading } = useGetRatesNotificationsQuery()
  const [saveRatesAlert, { isLoading: isProcessing }] = useSaveRatesNotificationsMutation()
  const { rates, isLoading } = useRates()

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      isRateSell: false,
      isRateBuy: false,
      rateSell: '0.0000',
      rateBuy: '0.000',
    },
  })

  useEffect(() => {
    if (data) {
      reset({
        isRateSell: data?.sell?.active ?? false,
        isRateBuy: data?.buy?.active ?? false,
        rateSell: data?.sell?.rate.toFixed(4) ?? '0.0000',
        rateBuy: data?.buy?.rate.toFixed(4) ?? '0.000',
      })
    }
  }, [data, reset])

  const onSubmit = async values => {
    try {
      await saveRatesAlert(values).unwrap()
      Toast.show({
        type: 'success',
        text2: 'Las alertas fueron guardadas correctamente.',
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (alertsLoading)
    return (
      <Container>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="green" />
        </View>
      </Container>
    )

  return (
    <KeyboardView>
      <Container>
        <DismissKeyboard>
          <View className="flex-1">
            <Text variant="button" className="mb-1 text-center">
              Tipo de cambio actual
            </Text>
            <Rates rates={rates} loading={isLoading} />
            <View className="mb-3" />
            <Card>
              <Text className="mb-2">Compra mayor a</Text>
              <Input control={control} name="rateBuy" keyboardType="decimal-pad" maxLength={6} />
              <View className="mt-3 flex-row justify-between items-center">
                <Text variant="caption" className="text-gray-500 w-[80%]">
                  Notificarme cuando la compra supere este valor
                </Text>
                <Controller
                  name="isRateBuy"
                  control={control}
                  render={({ field: { value, onChange } }) => <Switch value={value} onChange={onChange} />}
                />
              </View>
            </Card>
            <View className="mt-6" />
            <Card>
              <Text className="mb-2">Venta menor a</Text>
              <Input control={control} name="rateSell" keyboardType="decimal-pad" maxLength={6} />
              <View className="flex-row items-center justify-between mt-3">
                <Text variant="caption" className="text-gray-500 w-[80%]">
                  Notificarme cuando la venta baje de este valor
                </Text>
                <Controller
                  name="isRateSell"
                  control={control}
                  render={({ field: { value, onChange } }) => <Switch value={value} onChange={onChange} />}
                />
              </View>
            </Card>
            <View className="mt-auto" />
            <Button onPress={handleSubmit(onSubmit)} loading={isProcessing}>
              Guardar cambios
            </Button>
            <View className="mb-6" />
          </View>
        </DismissKeyboard>
      </Container>
    </KeyboardView>
  )
}

export default RatesAlertsScreen
