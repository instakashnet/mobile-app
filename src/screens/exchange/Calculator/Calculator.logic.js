import { useNavigation } from '@react-navigation/native'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert } from 'react-native'

import { EXCHANGE_TYPES } from '../../../../data/exchange'
import { calculateAmountToReceive } from '../../../helpers/exchange-operations'
import { useCoupon } from '../../../hooks/calculator/useCoupon'
import { useRates } from '../../../hooks/calculator/useRates'
import { useProfile } from '../../../hooks/useProfile'
import { useUpdate } from '../../../hooks/useUpdate'
import { useCreateExchangeMutation } from '../../../services/exchange'

export function useCalculatorLogic() {
  const { rates, getRates, isLoading: ratesLoading } = useRates(coupon)
  const { profile } = useProfile()
  const [exchangeType, setExchangeType] = useState('sell')
  const { navigate } = useNavigation()
  const amountRef = useRef(1000)
  const [createExchange, { isLoading: isProcessing }] = useCreateExchangeMutation()
  const { coupon, removeCoupon, addCoupon, isLoading: couponLoading } = useCoupon()
  const typeCurrencies = EXCHANGE_TYPES.find(type => type.type === exchangeType)

  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      currency_sent_id: 2,
      currency_received_id: 1,
      rate_id: null,
      profile_id: null,
      type: exchangeType,
      amount_sent: 1000,
      amount_received: 0,
      couponName: '',
    },
  })

  useUpdate(() => {
    if (profile?.id) {
      reset(values => ({
        ...values,
        profile_id: profile?.id,
      }))
    }
  }, [profile])

  // Update amount received when rates are loaded
  useUpdate(() => {
    if (rates?.buy > 0 && rates?.sell > 0) {
      reset(values => ({
        ...values,
        amount_received: calculateAmountToReceive(rates?.buy, rates?.sell, amountRef.current, exchangeType),
        rate_id: rates?.id,
      }))
    }
  }, [rates])

  // Update amount received when coupon is added or removed
  useUpdate(() => {
    if (coupon) {
      setValue('amount_received', calculateAmountToReceive(coupon?.rates?.buy, coupon?.rates?.sell, amountRef.current, exchangeType))
    } else {
      setValue('amount_received', calculateAmountToReceive(rates?.buy, rates?.sell, amountRef.current, exchangeType))
    }
  }, [coupon])

  // Handle swipe exchange type
  const handleSwipeType = (amount = 0) => {
    const newType = exchangeType === 'sell' ? 'buy' : 'sell'
    const currentRates = coupon?.rates || rates

    setExchangeType(newType)
    const newAmount = exchangeType === 'sell' ? amount * currentRates?.buy : amount / currentRates?.sell
    setValue('currency_sent_id', newType === 'sell' ? 2 : 1)
    setValue('currency_received_id', newType === 'sell' ? 1 : 2)
    setValue('amount_received', newAmount?.toFixed(2))
    setValue('type', newType)
  }

  // Handle submit exchange
  const onSubmit = async values => {
    try {
      const calculatorValues = { ...values, amount_received: Number(values.amount_received) }

      const order = await createExchange(calculatorValues).unwrap()
      navigate('SelectAccounts', { order })
    } catch (error) {
      if (error?.data?.error?.code === 'IK78911') return navigate('Verification')
    }
  }

  // Handle amount change on calculator
  const handleAmountChange = (value, ISO) => {
    const amount = Number(value)
    if (isNaN(amount)) return

    let amountToSend = 0,
      amountToReceive = 0
    const couponRates = coupon?.rates
    const buyRate = couponRates?.buy ?? rates?.buy
    const sellRate = couponRates?.sell ?? rates?.sell

    if (typeCurrencies?.send === ISO) {
      amountToReceive = exchangeType === 'sell' ? amount / sellRate : amount * buyRate
      amountRef.current = amount
      setValue('amount_received', amountToReceive?.toFixed(2))
    } else {
      amountToSend = exchangeType === 'sell' ? amount * sellRate : amount / buyRate
      amountRef.current = amountToSend
      setValue('amount_sent', amountToSend?.toFixed(2))
    }
  }

  // Handle timer finish for reset rates
  const handleTimerFinish = resetTimer => {
    Alert.alert(
      'Se ha agotado el tiempo',
      'El tipo de cambio pudo haber variado durante este tiempo. Continua para actualizar y poder generar un cambio.',
      [
        {
          text: 'Continuar',
          onPress: async () => {
            try {
              await getRates()
              removeCoupon()
              resetTimer()
            } catch (error) {
              console.log(error)
            }
          },
        },
      ],
    )
  }

  return {
    rates,
    typeCurrencies,
    ratesLoading,
    isProcessing,
    control,
    setValue,
    onSubmit: handleSubmit(onSubmit),
    coupon,
    removeCoupon,
    handleAddCoupon: name => addCoupon(name, rates, profile?.type),
    couponLoading,
    handleSwipe: () => handleSwipeType(amountRef.current),
    handleAmountChange,
    handleTimerFinish,
    profile,
    type: exchangeType,
  }
}
