import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'

import DiscountCouponIcon from '../../../assets/images/svgs/DiscountCouponIcon'
import { useReferral } from '../../hooks/calculator/useReferral'
import Input from '../UI/controlledInputs/Input'
import Helper from '../UI/Helper'
import DiscountsBanner from './DiscountsBanner'
import Text from '../utils/Text'

export default function CouponInput({ coupon, onAdd, onRemove, setValue, loading, profileType, exchangeLevel }) {
  const { colors } = useTheme()
  const [couponName, setCouponName] = useState('')
  const { data: referralStatus } = useReferral(profileType)

  const handleAdd = async name => {
    try {
      if (!name || name?.length < 4) return
      const couponAdded = await onAdd(name.trim())
      setValue('couponId', couponAdded.couponId)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove = () => {
    onRemove()
    setValue('couponId', null)
  }

  return !coupon ? (
    <>
      {profileType !== 'juridica' && <DiscountsBanner isReferral={referralStatus.referral} level={exchangeLevel} onAddCoupon={handleAdd} />}
      <View className="w-full relative mt-4">
        <View className="absolute h-full z-10 left-3 top-4" style={{ elevation: 5 }}>
          <DiscountCouponIcon width={22} />
        </View>
        <Input
          label="Ingresa un cupón"
          value={couponName}
          onChange={setCouponName}
          className="pr-20 pl-10 pb-2"
          autoComplete="off"
          autoCapitalize="characters"
        />
        {loading ? (
          <ActivityIndicator
            className="z-10 absolute right-3 top-[-2px] py-2 my-2 pl-2 border-l-[1px] border-gray-400"
            size="small"
            color={colors.primary700}
          />
        ) : (
          <Pressable
            className="z-10 absolute right-4 top-0 py-2 my-2 pl-2 border-l-[1px] border-gray-400"
            onPress={() => handleAdd(couponName)}>
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
