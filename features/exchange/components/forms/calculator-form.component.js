import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Text } from "../../../../components/typography/text.component";
// COMPONENTS
import { Spacer } from "../../../../components/utils/spacer.component";
import { CalculatorWrapper, Timer, TimerInfo, TimerWrapper } from "../calculator.styles";
import { InputCoupon } from "../calculator/coupon-input.component";
import { CouponApplied } from "../calculator/coupon.component";
import { Input } from "../calculator/input.component";
import { Rates } from "../calculator/rates.component";
import { SwapButton } from "../calculator/swap-button.component";

export const CalculatorForm = ({ formik, isFocused, rates, coupon, couponRates, isReferal, countdown, handleTimeout, setCouponName, onAddCoupon, onRemoveCoupon, ...rest }) => {
  const [toSendCurrency, setToSendCurrency] = useState("Soles"),
    [toReceiveCurrency, setToReceiveCurrency] = useState("Dólares"),
    [countRunnig, setCountRunning] = useState(false);
  const { setFieldValue } = formik,
    { type: calculatorType } = formik.values,
    { amountSentRef, amountReceivedRef, couponName } = rest;

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      if (isReferal) onAddCoupon("NUEVOREFERIDO1");
    }, [isReferal])
  );

  useEffect(() => {
    setCountRunning(isFocused);

    () => setCountRunning(false);
  }, [isFocused]);

  useEffect(() => {
    if (calculatorType === "sell") {
      setToSendCurrency("Soles");
      setToReceiveCurrency("Dólares");
    } else {
      setToSendCurrency("Dólares");
      setToReceiveCurrency("Soles");
    }
  }, [calculatorType]);

  // HANDLERS
  (onSwapHandler = () => {
    let amountToReceive = calculatorType === "sell" ? +formik.values.amount_sent * +rates.buy : +formik.values.amount_sent / +rates.sell;
    if (couponRates) amountToReceive = calculatorType === "sell" ? +formik.values.amount_sent * +couponRates.buy : +formik.values.amount_sent / +couponRates.sell;

    setFieldValue("currency_sent_id", formik.values.currency_sent_id === 1 ? 2 : 1);
    setFieldValue("currency_received_id", formik.values.currency_received_id === 1 ? 2 : 1);
    setFieldValue("type", calculatorType === "sell" ? "buy" : "sell");
    amountReceivedRef.current = amountToReceive;
    setFieldValue("amount_received", amountToReceive);
  }),
    (onChange = (name, value) => {
      setFieldValue(name, value);
      let conversionType, amountToReceive, amountToSend;

      if (name === "amount_sent") {
        conversionType = calculatorType === "sell" ? "divide" : "multiply";
        amountToReceive = conversionType === "divide" ? +value / rates.sell : +value * rates.buy;
        if (couponRates) amountToReceive = conversionType === "divide" ? +value / couponRates.sell : +value * couponRates.sell;

        setFieldValue("amount_received", amountToReceive);
        amountSentRef.current = value;
        amountReceivedRef.current = amountToReceive;
      } else {
        conversionType = calculatorType === "sell" ? "multiply" : "divide";
        amountToSend = conversionType === "divide" ? +value / rates.buy : +value * rates.sell;
        if (couponRates) amountToSend = conversionType === "divide" ? +value / couponRates.buy : +value * couponRates.sell;

        setFieldValue("amount_sent", amountToSend);
        amountReceivedRef.current = value;
        amountSentRef.current = amountToSend;
      }
    });

  return (
    <>
      <Text variant="title">Comienza el cambio</Text>
      <Rates couponRates={couponRates} rates={rates} />

      <TimerInfo>
        <Text variant="button">La tasa se actualizará en:</Text>
        <TimerWrapper>
          <CountdownCircleTimer key={countdown.toString()} isPlaying duration={300} size={18} strokeWidth={2.5} colors="#0D8284" />
          <Timer
            id={countdown.toString()}
            running={countRunnig}
            until={300}
            size={14}
            showSeparator
            onFinish={handleTimeout}
            timeToShow={["M", "S"]}
            timeLabels={{ m: "", s: "" }}
          />
        </TimerWrapper>
      </TimerInfo>
      <Spacer variant="top" />
      <CalculatorWrapper>
        <Input
          name="amount_sent"
          onChange={onChange}
          label="Envías"
          value={formik.values.amount_sent}
          currency={toSendCurrency}
          symbol={toSendCurrency === "Soles" ? "S/." : "$"}
        />
        <SwapButton onPress={onSwapHandler} />
        <Spacer variant="top" size={2} />
        <Input
          name="amount_received"
          onChange={onChange}
          label="Recibes"
          value={formik.values.amount_received}
          currency={toReceiveCurrency}
          symbol={toReceiveCurrency === "Soles" ? "S/." : "$"}
        />
      </CalculatorWrapper>
      <Spacer variant="top" size={3} />

      {coupon ? <CouponApplied coupon={coupon} onRemove={onRemoveCoupon} /> : <InputCoupon couponName={couponName} setCouponName={setCouponName} onAddCoupon={onAddCoupon} />}

      <Spacer variant="top" />
    </>
  );
};
