import Container from '../../components/utils/Container'
import Card from '../../components/UI/Card'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import Input from '../../components/UI/Input'
import { Controller, useForm } from 'react-hook-form'
import Switch from '../../components/UI/Swtich'
import Button from '../../components/UI/Button'

function RatesAlertsScreen() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      isRateSell: false,
      isRateBuy: false,
      rateSell: '0.000',
      rateBuy: '0.000'
    }
  })

  const onSubmit = (values) => console.log(values)

  return (
    <Container>
      <Card>
        <Text className='mb-2'>Compra mayor a</Text>
        <Input control={control} name='rateBuy' keyboardType='decimal-pad' maxLength={5} />
        <View className='mt-3 flex-row justify-between items-center'>
          <Text variant='caption' className='text-gray-500 w-[80%]'>
            Notificarme cuando la compra supere este valor
          </Text>
          <Controller
            name='isRateBuy'
            control={control}
            render={({ field: { value, onChange } }) => <Switch value={value} onChange={onChange} />}
          />
        </View>
      </Card>
      <View className='mt-6' />
      <Card>
        <Text className='mb-2'>Venta menor a</Text>
        <Input control={control} name='rateSell' keyboardType='decimal-pad' maxLength={5} />
        <View className='flex-row items-center justify-between mt-3'>
          <Text variant='caption' className='text-gray-500 w-[80%]'>
            Notificarme cuando la venta baje de este valor
          </Text>
          <Controller
            name='isRateSell'
            control={control}
            render={({ field: { value, onChange } }) => <Switch value={value} onChange={onChange} />}
          />
        </View>
      </Card>
      <View className='mt-auto' />
      <Button onPress={handleSubmit(onSubmit)}>Guardar cambios</Button>
      <View className='mb-6' />
    </Container>
  )
}

export default RatesAlertsScreen
