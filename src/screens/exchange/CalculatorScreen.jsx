import React, { useRef } from 'react'
import { ScrollView, View, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import Container from '../../components/utils/Container'
import Card from '../../components/UI/Card'
import Title from '../../components/utils/Title'
import CurrencyInput from '../../components/calculator/CurrencyInput'
import Rates from '../../components/calculator/Rates'
import Timer from '../../components/utils/Timer'
import SwipeButton from '../../components/calculator/SwipeButton'
import CouponInput from '../../components/calculator/CouponInput'
import Button from '../../components/UI/Button'
import { useCreateExchangeMutation } from '../../services/exchange'
import ChangeProfileBtn from '../../components/calculator/ChangeProfileBtn'
import { selectUser } from '../../store/slices/authSlice'
import { useExchangeType } from '../../hooks/calculator/useExchangeType'
import { useExchangeCoupon } from '../../hooks/calculator/useExchangeCoupon'
import { useProfile } from '../../hooks/useProfile'
import { calculateAmountToReceive } from '../../helpers/exchange-operations'
import { useUpdate } from '../../hooks/useUpdate'
import { useCountdown } from '../../hooks/useCountdown'
import { useRates } from '../../hooks/calculator/useRates'

const EXCHANGE_TYPES = [
  {
    type: 'sell',
    send: 'PEN',
    receive: 'USD',
  },
  {
    type: 'buy',
    send: 'USD',
    receive: 'PEN',
  },
]

const RATES_TIME = 300000

export default function CalculatorScreen({ navigation }) {
  const user = useSelector(selectUser)
  const [createExchange, { isLoading: isProcessing }] = useCreateExchangeMutation()
  const { coupon, removeCoupon, addCoupon, isLoading: loadingCoupon } = useExchangeCoupon()
  const { exchangeType, handleSwipeExchangeType } = useExchangeType()
  const { timerId, countdown, completeHandler } = useCountdown(RATES_TIME)
  const { profile } = useProfile()
  const typeCurrencies = EXCHANGE_TYPES.find(type => type.type === exchangeType)
  const amountRef = useRef(1000)
  const { rates, getRates, isLoading } = useRates(coupon)
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      currency_sent_id: 2,
      currency_received_id: 1,
      rate_id: rates?.id,
      profile_id: user?.profileId,
      type: exchangeType,
      amount_sent: 1000,
      amount_received: 0,
      couponName: '',
    },
  })

  useUpdate(() => {
    if (rates?.buy > 0 && rates?.sell > 0) {
      setValue('amount_received', calculateAmountToReceive(rates?.buy, rates?.sell, amountRef.current, exchangeType))
      setValue('rate_id', rates?.id)
    }
  }, [rates])

  useUpdate(() => {
    if (coupon) {
      setValue('amount_received', calculateAmountToReceive(coupon?.rates?.buy, coupon?.rates?.sell, amountRef.current, exchangeType))
    } else {
      setValue('amount_received', calculateAmountToReceive(rates?.buy, rates?.sell, amountRef.current, exchangeType))
    }
  }, [coupon])

  // HANDLERS
  const handleChangeProfile = () => navigation.replace('SelectProfile')
  const handleAmountChange = (value, ISO) => {
    const amount = Number(value)
    if (isNaN(amount)) return

    let amountToSend = 0,
      amountToReceive = 0
    const couponRates = coupon?.rates
    const buyRate = couponRates?.buy ?? rates?.buy
    const sellRate = couponRates?.sell ?? rates?.sell

    if (typeCurrencies?.send === ISO) {
      amountToReceive = exchangeType === 'sell' ? amount / sellRate : amount * sellRate
      amountRef.current = amount
      setValue('amount_received', amountToReceive?.toFixed(2))
    } else {
      amountToSend = exchangeType === 'sell' ? amount * sellRate : amount / buyRate
      amountRef.current = amountToSend
      setValue('amount_sent', amountToSend?.toFixed(2))
    }
  }
  const handleSwipe = () => handleSwipeExchangeType(coupon?.rates || rates, amountRef.current, setValue)
  const handleAddCoupon = name => addCoupon(name, rates, profile?.type)
  const onSubmit = async values => {
    try {
      const calculatorValues = { ...values, amount_received: Number(values.amount_received) }

      const order = await createExchange(calculatorValues).unwrap()
      navigation.navigate('SelectAccounts', { order })
    } catch (error) {
      if (error?.data?.error?.code === 'IK78911') return navigation.navigate('Verification')
    }
  }
  const onResetCalculator = async reset => {
    console.log('refetching')

    try {
      await getRates()
      removeCoupon()
      reset()
    } catch (error) {
      console.log(error)
    }
  }
  const handleTimerFinish = resetTimer => {
    Alert.alert(
      'Se ha agotado el tiempo',
      'El tipo de cambio pudo haber variado durante este tiempo. Continua para actualizar y poder generar un cambio.',
      [
        {
          text: 'Continuar',
          onPress: () => onResetCalculator(resetTimer),
        },
      ],
    )
  }

  return (
    <ScrollView keyboardDismissMode="on-drag">
      <Container>
        <ChangeProfileBtn onPress={handleChangeProfile} />
        <Card classes={['py-4']}>
          <Title className="text-center">Comienza tu cambio</Title>
          <View className="mt-3" />
          <Rates rates={rates} type={exchangeType} coupon={coupon} loading={isLoading} />
          <View className="flex-row items-center justify-between">
            <Text variant="caption">El tipo de cambio se actualiza en:</Text>
            <Timer timerId={timerId} countdown={countdown} onFinish={() => completeHandler(handleTimerFinish)} />
          </View>
          <View className="mt-8 relative">
            <CurrencyInput onAmountChange={handleAmountChange} iso={typeCurrencies?.send} name="amount_sent" control={control} />
            <View className="mt-5" />
            <SwipeButton onSwipe={handleSwipe} />
            <CurrencyInput onAmountChange={handleAmountChange} iso={typeCurrencies?.receive} name="amount_received" control={control} />
          </View>
          <View className="mt-6" />
          <CouponInput onRemove={removeCoupon} coupon={coupon} onAdd={handleAddCoupon} setValue={setValue} loading={loadingCoupon} />
        </Card>
        <View className="mt-4" />
        <Button onPress={handleSubmit(onSubmit)} loading={isProcessing} disabled={isProcessing}>
          Comenzar cambio
        </Button>
      </Container>
    </ScrollView>
  )
}