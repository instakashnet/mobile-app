import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";

// COMPONENTS
import { Spacer } from "../../../../components/utils/spacer.component";
import { FormWrapper, Caption } from "../exchange.styles";
import { CalculatorWrapper, CouponInputWrapper, CouponInput, CouponButton } from "../calculator.styles";
import { CouponApplied } from "../calculator/coupon.component";
import { Input } from "../calculator/input.component";
import { SwapButton } from "../calculator/swap-button.component";
import { Button } from "../../../../components/UI/button.component";

export const CalculatorForm = ({ onAddCoupon, onRemoveCoupon, isProcessing, profile, onSubmit, rates, coupon, couponRates }) => {
  const [toSendCurrency, setToSendCurrency] = useState("Soles"),
    [toReceiveCurrency, setToReceiveCurrency] = useState("Dólares"),
    [couponName, setCouponName] = useState(""),
    amountSentRef = useRef(1000),
    amountReceivedRef = useRef(0);

  // FORMIK
  const formik = useFormik({
      initialValues: {
        currency_sent_id: 2,
        couponName: "",
        currency_received_id: 1,
        profile_id: profile.id,
        rate_id: rates.id || "",
        type: "sell",
        amount_sent: 0,
        amount_received: 0,
      },
      enableReinitialize: true,
      onSubmit,
    }),
    { setFieldValue } = formik,
    { type: calculatorType } = formik.values;

  // EFFECTS
  useEffect(() => {
    if (calculatorType === "sell") {
      setToSendCurrency("Soles");
      setToReceiveCurrency("Dólares");
    } else {
      setToSendCurrency("Dólares");
      setToReceiveCurrency("Soles");
    }
  }, [calculatorType]);

  useEffect(() => {
    if (rates.sell > 0) {
      setFieldValue("amount_sent", amountSentRef.current);
      setFieldValue("amount_received", amountSentRef.current / +rates.sell);
      amountReceivedRef.current = amountSentRef.current / +rates.sell;
    }
  }, [rates, setFieldValue]);

  useEffect(() => {
    if (couponRates) {
      setFieldValue("amount_received", calculatorType === "buy" ? +amountSentRef.current * +couponRates.buy : +amountSentRef.current / +couponRates.sell);
    } else {
      if (+amountReceivedRef.current > 0) setFieldValue("amount_received", calculatorType === "buy" ? +amountSentRef.current * +rates.buy : +amountSentRef.current / +rates.sell);
    }
  }, [couponRates]);

  // HANDLERS
  const onSwapHandler = () => {
    let amountToReceive = calculatorType === "sell" ? +formik.values.amount_sent * +rates.buy : +formik.values.amount_sent / +rates.sell;
    if (couponRates) amountToReceive = calculatorType === "sell" ? +formik.values.amount_sent * +couponRates.buy : +formik.values.amount_sent / +couponRates.sell;

    setFieldValue("currency_sent_id", formik.values.currency_sent_id === 1 ? 2 : 1);
    setFieldValue("currency_received_id", formik.values.currency_received_id === 1 ? 2 : 1);
    setFieldValue("type", calculatorType === "sell" ? "buy" : "sell");
    amountReceivedRef.current = amountToReceive;
    setFieldValue("amount_received", amountToReceive);
  };

  const onChange = (name, value) => {
    setFieldValue(name, value);
    let conversionType, amountToReceive, amountToSend;

    if (name === "amount_sent") {
      conversionType = calculatorType === "sell" ? "divide" : "multiply";
      amountToReceive = conversionType === "divide" ? +value / rates.sell : +value * rates.sell;
      if (couponRates) amountToReceive = conversionType === "divide" ? +value / couponRates.sell : +value * couponRates.sell;

      setFieldValue("amount_received", amountToReceive);
      amountSentRef.current = value;
      amountReceivedRef.current = amountToReceive;
    } else {
      conversionType = calculatorType === "sell" ? "multiply" : "divide";
      amountToSend = conversionType === "divide" ? +value / rates.buy : +value * rates.buy;
      if (couponRates) amountToSend = conversionType === "divide" ? +value / couponRates.buy : +value * couponRates.buy;

      setFieldValue("amount_sent", amountToSend);
      amountReceivedRef.current = value;
      amountSentRef.current = amountToSend;
    }
  };

  return (
    <FormWrapper>
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
      <Spacer variant="vertical" size={5}>
        <Caption>¿Monto mayor a $ 5,000?</Caption>
      </Spacer>

      {coupon ? (
        <CouponApplied coupon={coupon} onRemove={onRemoveCoupon} />
      ) : (
        <CouponInputWrapper>
          <CouponInput value={couponName} label="Agregar cupón" onChangeText={setCouponName} />
          <CouponButton onPress={() => onAddCoupon(couponName)} disabled={!couponName} loading={isProcessing}>
            Agregar
          </CouponButton>
        </CouponInputWrapper>
      )}

      <Spacer variant="top" />
      <Button onPress={formik.handleSubmit} disabled={!formik.isValid || isProcessing} loading={isProcessing}>
        Comenzar cambio
      </Button>
    </FormWrapper>
  );
};
