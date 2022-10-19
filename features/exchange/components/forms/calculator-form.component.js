import { useFocusEffect } from "@react-navigation/native";
import { useFormik } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, removeCoupon, validateCoupon } from "../../../../store/actions";
// COMPONENTS
import { Button } from "../../../../components/UI/button.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { CalculatorWrapper } from "../calculator.styles";
import { InputCoupon } from "../calculator/coupon-input.component";
import { CouponApplied } from "../calculator/coupon.component";
import { Input } from "../calculator/input.component";
import { SwapButton } from "../calculator/swap-button.component";
import { FormWrapper } from "../exchange.styles";

export const CalculatorForm = ({ user, rates, coupon, couponRates, profile, handleModal }) => {
  const [toSendCurrency, setToSendCurrency] = useState("Soles"),
    [toReceiveCurrency, setToReceiveCurrency] = useState("Dólares"),
    dispatch = useDispatch(),
    amountSentRef = useRef(1000),
    amountReceivedRef = useRef(0),
    isProcessing = useSelector((state) => state.exchangeReducer.isProcessing),
    formik = useFormik({
      initialValues: {
        currency_sent_id: 2,
        currency_received_id: 1,
        profile_id: profile.id,
        rate_id: rates?.id || "",
        type: "sell",
        amount_sent: 0,
        couponName: "",
        amount_received: 0,
      },
      enableReinitialize: true,
      onSubmit: (values) => {
        if (user.level < 3 && ((values.type === "sell" && values.amount_received >= 1000) || (values.type === "buy" && values.amount_sent >= 1000))) {
          return handleModal("profile");
        } else dispatch(createOrder(values));
      },
    }),
    { amount_sent, amount_received, type: calculatorType } = formik.values;

  // HANDLERS
  const onAddCoupon = (name) => {
    dispatch(validateCoupon(name, profile.type));
  };

  const onRemoveCoupon = () => {
    dispatch(removeCoupon());
  };

  const onSwapHandler = () => {
    let amountToReceive = calculatorType === "sell" ? +formik.values.amount_sent * +rates.buy : +formik.values.amount_sent / +rates.sell;
    if (couponRates) amountToReceive = calculatorType === "sell" ? +formik.values.amount_sent * +couponRates.buy : +formik.values.amount_sent / +couponRates.sell;

    formik.setFieldValue("currency_sent_id", formik.values.currency_sent_id === 1 ? 2 : 1);
    formik.setFieldValue("currency_received_id", formik.values.currency_received_id === 1 ? 2 : 1);
    formik.setFieldValue("type", calculatorType === "sell" ? "buy" : "sell");
    amountReceivedRef.current = amountToReceive;
    formik.setFieldValue("amount_received", amountToReceive);
  };

  const onChange = (name, value) => {
    formik.setFieldValue(name, value);
    let conversionType, amountToReceive, amountToSend;

    if (name === "amount_sent") {
      conversionType = calculatorType === "sell" ? "divide" : "multiply";
      amountToReceive = conversionType === "divide" ? +value / rates.sell : +value * rates.buy;
      if (couponRates) amountToReceive = conversionType === "divide" ? +value / couponRates.sell : +value * couponRates.buy;

      formik.setFieldValue("amount_received", amountToReceive);
      amountSentRef.current = value;
      amountReceivedRef.current = amountToReceive;
    } else {
      conversionType = calculatorType === "sell" ? "multiply" : "divide";
      amountToSend = conversionType === "divide" ? +value / rates.buy : +value * rates.sell;
      if (couponRates) amountToSend = conversionType === "divide" ? +value / couponRates.buy : +value * couponRates.sell;

      formik.setFieldValue("amount_sent", amountToSend);
      amountReceivedRef.current = value;
      amountSentRef.current = amountToSend;
    }
  };

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      if (user.isReferal) onAddCoupon("NUEVOREFERIDO1");
    }, [user])
  );

  useEffect(() => {
    if (+rates.sell > 0 && !coupon) {
      formik.setFieldValue("amount_sent", amountSentRef.current);
      formik.setFieldValue("amount_received", amountSentRef.current / +rates.sell);
      amountReceivedRef.current = amountSentRef.current / +rates.sell;
    }
  }, [rates]);

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
    let amountToReceive = 0,
      amountToSend = amountSentRef.current || +formik.values.amount_sent;

    if (couponRates) {
      amountToReceive = calculatorType === "sell" ? amountToSend / +couponRates.sell : amountToSend * +couponRates.buy;
      formik.setFieldValue("amount_received", amountToReceive);
    } else {
      amountToReceive = calculatorType === "sell" ? amountToSend / +rates.sell : amountToSend * +rates.buy;
      formik.setFieldValue("amount_received", amountToReceive);
    }

    formik.setFieldValue("amount_sent", amountToSend);
  }, [couponRates]);

  return (
    <>
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
        <Spacer variant="top" size={3} />

        {coupon ? <CouponApplied coupon={coupon} onRemove={onRemoveCoupon} /> : <InputCoupon onAddCoupon={onAddCoupon} />}
      </FormWrapper>
      <Spacer variant="top" size={2} />
      <Button onPress={formik.handleSubmit} disabled={amount_sent <= 0 || amount_received <= 0 || isProcessing} loading={isProcessing}>
        Comenzar cambio
      </Button>
    </>
  );
};
