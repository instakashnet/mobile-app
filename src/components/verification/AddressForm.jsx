import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { addAddressSchema } from '../../schemas/verification'
import { useAddAddressMutation } from '../../services/user'
import { selectUser } from '../../store/slices/authSlice'
import Button from '../UI/Button'
import Helper from '../UI/Helper'
import Input from '../UI/Input'

export default function AddressForm() {
  const user = useSelector(selectUser)
  const navigation = useNavigation()
  const [addAddress, { isLoading }] = useAddAddressMutation()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      city: '',
      address: '',
      district: '',
      profileId: user?.profileId,
    },
    resolver: yupResolver(addAddressSchema),
    mode: 'onTouched',
  })

  const onSubmit = async values => {
    try {
      await addAddress(values).unwrap()
      return navigation.navigate('Occupation')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Input name="city" control={control} label="Ciudad" maxLength={16} error={errors.city} />
      <Helper error={errors.city?.message} />
      <View className="mt-2" />
      <Input name="district" control={control} maxLength={20} label="Distrito" error={errors.district} />
      <Helper error={errors.district?.message} />
      <View className="mt-2" />
      <Text variant="button" className="mb-2 text-gray-500">
        Dirección corta
      </Text>
      <Input name="address" control={control} maxLength={100} label="Calle, piso, apto." error={errors.address} />
      <Helper error={errors.address?.message} />
      <View className="mt-auto" />
      <Button onPress={handleSubmit(onSubmit)} loading={isLoading} disabled={!isValid}>
        Continuar
      </Button>
      <View className="mt-3" />
      <Button variant="secondary" onPress={() => navigation.popToTop()}>
        Volver al inicio
      </Button>
    </>
  )
}
