import { useState } from 'react'
import { useLazyGetCouponDataQuery } from '../services/exchange'

export function useExchangeCoupon() {
  const [coupon, setCoupon] = useState(null)
  const [getCouponData, { isLoading }] = useLazyGetCouponDataQuery()

  const addCoupon = async (name = '', rates, profileType) => {
    const couponName = name?.toUpperCase()

    try {
      const response = await getCouponData({ couponName, profileType }).unwrap()
      const newRates = { buy: rates?.buy + response.discount, sell: rates?.sell - response.discount }
      setCoupon({ name: couponName, rates: newRates })
    } catch (error) {
      console.log(error)
    }
  }

  const removeCoupon = () => setCoupon(null)

  return { coupon, addCoupon, removeCoupon, isLoading }
}
