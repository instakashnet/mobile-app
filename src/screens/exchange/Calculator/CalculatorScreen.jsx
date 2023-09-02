import React from 'react'
import { ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'

import { RATES_TIME } from '../../../../data/exchange'
import ChangeProfileBtn from '../../../components/calculator/ChangeProfileBtn'
import CouponInput from '../../../components/calculator/CouponInput'
import CurrencyInput from '../../../components/calculator/CurrencyInput'
import Rates from '../../../components/calculator/Rates'
import SwipeButton from '../../../components/calculator/SwipeButton'
import Button from '../../../components/UI/Button'
import Card from '../../../components/UI/Card'
import Container from '../../../components/utils/Container'
import Timer from '../../../components/utils/Timer'
import Title from '../../../components/utils/Title'
import { useLastOrder } from '../../../hooks/calculator/useLastOrder'
import { useCountdown } from '../../../hooks/useCountdown'
import { selectUser } from '../../../store/slices/authSlice'
import { useCalculatorLogic } from './Calculator.logic'
import Text from '@/components/utils/Text'

export default function CalculatorScreen({ navigation }) {
  const user = useSelector(selectUser)
  const { timerId, countdown, completeHandler } = useCountdown(RATES_TIME)
  const {
    control,
    setValue,
    onSubmit,
    coupon,
    handleAddCoupon,
    couponLoading,
    removeCoupon,
    rates,
    type,
    ratesLoading,
    isProcessing,
    profile,
    handleSwipe,
    handleAmountChange,
    handleTimerFinish,
    typeCurrencies,
  } = useCalculatorLogic()

  useLastOrder()

  // HANDLERS
  const handleChangeProfile = () => navigation.replace('SelectProfile')

  return (
    <ScrollView keyboardDismissMode="on-drag">
      <Container>
        <ChangeProfileBtn onPress={handleChangeProfile} />
        <Card classes={['py-4']}>
          <Title className="text-center">Comienza tu cambio</Title>
          <View className="mt-3" />
          <Rates rates={rates} type={type} coupon={coupon} loading={ratesLoading} />
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
          <CouponInput
            exchangeLevel={user?.level}
            profileType={profile?.type}
            onRemove={removeCoupon}
            coupon={coupon}
            onAdd={handleAddCoupon}
            setValue={setValue}
            loading={couponLoading}
          />
        </Card>
        <View className="mt-4" />
        <Button onPress={onSubmit} loading={isProcessing} disabled={isProcessing}>
          Comenzar cambio
        </Button>
      </Container>
    </ScrollView>
  )
}
