import React, { useRef, useState } from 'react'
import Container from '../../components/utils/Container'
import KeyboardView from '../../components/utils/KeyboardView'
import DismissKeyboard from '../../components/utils/DismissKeyboard'
import Banner from '../../components/UI/Banner'
import { Text } from 'react-native-paper'
import { View } from 'react-native'

import { useForm } from 'react-hook-form'
import ControlledInput from '../../components/UI/controlledInputs/Input'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import { useUpdate } from '../../hooks/useUpdate'
import { useRucInfo } from '../../hooks/useRucInfo'
import Checkbox from '../../components/UI/Checkbox'
import { yupResolver } from '@hookform/resolvers/yup'
import { addCompanyProfileSchema } from '../../schemas/user'
import Helper from '../../components/UI/Helper'
import { useAddProfileMutation } from '../../services/userData'

export default function AddProfileScreen({ navigation }) {
  const debounceRef = useRef(null)
  const [ruc, setRuc] = useState('')
  const { rucInfo, validateRuc } = useRucInfo()
  const [addProfile, { isLoading }] = useAddProfileMutation()

  const {
    setValue,
    control,
    handleSubmit,
    resetField,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      type: 'juridica',
      ruc: '',
      razon_social: '',
      address: '',
      accept: false
    },
    resolver: yupResolver(addCompanyProfileSchema)
  })

  useUpdate(() => {
    if (rucInfo) {
      setValue('razon_social', rucInfo?.nombre_o_razon_social, { shouldValidate: true })
      setValue('address', rucInfo?.direccion, { shouldValidate: true })
    } else {
      resetField('razon_social')
      resetField('address')
    }
  }, [rucInfo])

  const handleRucChange = (value) => {
    setValue('ruc', value, { shouldValidate: true })
    setRuc(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!value || value.length < 11) return
    debounceRef.current = setTimeout(() => validateRuc(value), 1000)
  }

  const onSubmit = async (values) => {
    try {
      await addProfile(values).unwrap()
      return navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <KeyboardView>
      <DismissKeyboard>
        <Container>
          <Banner type='info'>
            <Text>Los perfiles empresas te ayudan a realizar cambio a nombre de estas empresas.</Text>
          </Banner>
          <View className='mt-6' />
          <Text variant='button'>Datos de la empresa</Text>
          <View className='mt-3' />
          <ControlledInput label='Ingresa el RUC' value={ruc} onChange={handleRucChange} keyboardType='number-pad' />
          <Helper error={errors.ruc?.message} />
          {rucInfo ? (
            <>
              <View className='mt-1' />
              <Input name='razon_social' control={control} label='Razón social' error={errors.razon_social} />
              <Helper error={errors.razon_social?.message} />
              <View className='mt-1' />
              <Input name='address' control={control} label='Dirección discal' error={errors.address} multiline={true} numberOfLines={4} />
              <Helper error={errors.address?.message} />
              <View className='mt-1' />
              <Checkbox control={control} name='accept'>
                <Text variant='caption'>Declaro que soy el representante legal o persona autorizada de la empresa.</Text>
              </Checkbox>
              <View className='mt-auto' />
              <Button onPress={handleSubmit(onSubmit)} loading={isLoading} disabled={!isValid}>
                Agregar empresa
              </Button>
            </>
          ) : null}
        </Container>
      </DismissKeyboard>
    </KeyboardView>
  )
}
