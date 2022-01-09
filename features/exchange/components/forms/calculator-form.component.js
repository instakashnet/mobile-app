import React, { useState, useEffect, useRef, useCallback } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Popover from "react-native-popover-view";

// FORMIK
import { useFormik } from "formik";

// REDUX
import { useDispatch } from "react-redux";
import { validateCoupon, removeCoupon } from "../../../../store/actions";

// COMPONENTS
import { Spacer } from "../../../../components/utils/spacer.component";
import { CouponApplied } from "../calculator/coupon.component";
import { Input } from "../calculator/input.component";
import { SwapButton } from "../calculator/swap-button.component";
import { Button } from "../../../../components/UI/button.component";
import { Text } from "../../../../components/typography/text.component";

// STYLED COMPONENTS
import { FormWrapper, Caption } from "../exchange.styles";
import { CalculatorWrapper, CouponInputWrapper, CouponInput, CouponButton, InfoWrapper, TimerWrapper, Timer } from "../calculator.styles";

export const CalculatorForm = ({ getRates, isProcessing, isFocused, profile, onSubmit, rates, coupon, couponRates, isReferal }) => {
  const dispatch = useDispatch(),
    [toSendCurrency, setToSendCurrency] = useState("Soles"),
    [toReceiveCurrency, setToReceiveCurrency] = useState("Dólares"),
    [couponName, setCouponName] = useState(""),
    [countdown, setCountdown] = useState(1),
    [countRunnig, setCountRunning] = useState(false),
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
    { type: calculatorType, amount_sent, amount_received } = formik.values;

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
  const onAddCoupon = useCallback(
      (name) => {
        formik.setFieldValue("couponName", name);
        dispatch(validateCoupon(name, profile.type));
      },
      [profile.type]
    ),
    onRemoveCoupon = () => {
      dispatch(removeCoupon());
      formik.setFieldValue("couponName", "");
    },
    onGetRates = useCallback(() => {
      setCountdown(Math.random());
      getRates();
      onRemoveCoupon();

      if (isReferal) onAddCoupon("NUEVOREFERIDO1");
    }, [isReferal]),
    onSwapHandler = () => {
      let amountToReceive = calculatorType === "sell" ? +formik.values.amount_sent * +rates.buy : +formik.values.amount_sent / +rates.sell;
      if (couponRates) amountToReceive = calculatorType === "sell" ? +formik.values.amount_sent * +couponRates.buy : +formik.values.amount_sent / +couponRates.sell;

      setFieldValue("currency_sent_id", formik.values.currency_sent_id === 1 ? 2 : 1);
      setFieldValue("currency_received_id", formik.values.currency_received_id === 1 ? 2 : 1);
      setFieldValue("type", calculatorType === "sell" ? "buy" : "sell");
      amountReceivedRef.current = amountToReceive;
      setFieldValue("amount_received", amountToReceive);
    },
    onChange = (name, value) => {
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
        if (couponRates) amountToSend = conversionType === "divide" ? +value / couponRates.buy : +value * couponRates.buy;

        setFieldValue("amount_sent", amountToSend);
        amountReceivedRef.current = value;
        amountSentRef.current = amountToSend;
      }
    };

  return (
    <>
      <TimerWrapper>
        <Text variant="bold">El tipo de cambio se actualizará:</Text>
        <Timer id={countdown.toString()} running={countRunnig} until={300} size={14} showSeparator onFinish={onGetRates} timeToShow={["M", "S"]} timeLabels={{ m: "", s: "" }} />
      </TimerWrapper>

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
        <Spacer variant="top" size={4} />
        <InfoWrapper>
          <Caption>¿Montos mayores a $ 5,000?</Caption>
          <Spacer variant="left" />
          <Popover
            from={
              <TouchableOpacity>
                <MaterialCommunityIcons name="information-outline" size={25} color="#0D8284" />
              </TouchableOpacity>
            }
            popoverStyle={{ padding: 15 }}
          >
            <Text variant="button">Escribenos a nuestro whatsapp para ofrecerte un cupón de descuento para tu cambio.</Text>
          </Popover>
        </InfoWrapper>

        <Spacer variant="top" size={4} />

        {coupon ? (
          <CouponApplied coupon={coupon} onRemove={onRemoveCoupon} />
        ) : (
          <CouponInputWrapper>
            <CouponInput autoCorrect={false} autoComplete="off" value={couponName} label="Agregar cupón" onChangeText={setCouponName} />
            <CouponButton onPress={() => onAddCoupon(couponName)} disabled={!couponName} loading={isProcessing}>
              <Text variant="button" style={{ color: !couponName ? "#676767" : "#FFF" }}>
                Agregar
              </Text>
            </CouponButton>
          </CouponInputWrapper>
        )}

        <Spacer variant="top" />
        <Button onPress={formik.handleSubmit} disabled={amount_sent <= 0 || amount_received <= 0 || isProcessing} loading={isProcessing}>
          Comenzar cambio
        </Button>
      </FormWrapper>
    </>
  );
};
