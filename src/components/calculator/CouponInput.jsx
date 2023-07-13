import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { ActivityIndicator, Text, useTheme } from 'react-native-paper'

import { useReferral } from '../../hooks/calculator/useReferral'
import Button from '../UI/Button'
import Input from '../UI/controlledInputs/Input'
// import DiscountCouponIcon from '../../../assets/images/svgs/DiscountCouponIcon'
import Helper from '../UI/Helper'

export default function CouponInput({ coupon, onAdd, onRemove, setValue, loading, profileType, exchangeLevel }) {
  const { colors } = useTheme()
  const [couponName, setCouponName] = useState('')
  const { data: referralStatus } = useReferral(profileType)

  const handleAdd = async () => {
    try {
      await onAdd(couponName)
      setValue('couponName', couponName)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDiscountAdd = async name => {
    try {
      await onAdd(name)
      setValue('couponName', name)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove = () => {
    onRemove()
    setValue('couponName', '')
  }

  return !coupon ? (
    <>
      {referralStatus?.referral ? (
        <>
          <Text variant="button">Descuento de primer cambio</Text>
          <Button variant="secondary" className="mt-3" onPress={() => handleDiscountAdd(referralStatus?.coupon)}>
            Activar descuento
          </Button>
          <View className="border border-gray-200 my-4" />
        </>
      ) : (
        <>
          <Text variant="button">Eres {exchangeLevel}</Text>
          {(exchangeLevel?.includes('SENIOR') || exchangeLevel?.includes('EXPERTO')) && (
            <Button variant="secondary" className="mt-3" onPress={() => handleDiscountAdd('KASH' + exchangeLevel?.replace(' ', ''))}>
              Activar descuento
            </Button>
          )}
          <View className="border border-gray-200 my-4" />
        </>
      )}
      <View className="w-full relative">
        {/* <View className='absolute h-full w-full z-10 left-3 top-4'>
        <DiscountCouponIcon width={22} />
      </View> */}
        <Input label="Ingresa un cupón" value={couponName} onChange={setCouponName} className="pr-20 pb-2" />
        {loading ? (
          <ActivityIndicator
            className="z-10 absolute right-3 top-[-2px] py-2 my-2 pl-2 border-l-[1px] border-gray-400"
            size="small"
            color={colors.primary700}
          />
        ) : (
          <Pressable className="z-10 absolute right-4 top-0 py-2 my-2 pl-2 border-l-[1px] border-gray-400" onPress={handleAdd}>
            <Text variant="button" className="text-xs" style={{ color: colors.primary700 }}>
              Agregar
            </Text>
          </Pressable>
        )}
      </View>
      <Helper helper="Agrega un cupón de descuento para obtener un mejor tipo de cambio." />
    </>
  ) : (
    <>
      <Text className="mb-2 text-center" variant="button">
        ¡Genial!, has activado el cupón
      </Text>
      <View
        className="w-full border-2 border-dashed px-3 pr-0 rounded-lg flex-row items-center justify-between"
        style={{ borderColor: colors.primary700 }}>
        <Text variant="button" className="text-uppercase" style={{ color: colors.primary700 }}>
          {coupon?.name}
        </Text>
        <Pressable onPress={handleRemove} className="p-2">
          <Ionicons name="close-outline" size={25} color={colors.primary700} />
        </Pressable>
      </View>
    </>
  )
}
