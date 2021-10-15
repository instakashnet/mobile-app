import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

// COMPONENTS
import { Spacer } from "../../../../components/utils/spacer.component";
import { FormWrapper, Caption } from "../exchange.styles";
import { CalculatorWrapper, CouponWrapper, CouponInput, CouponButton } from "../calculator.styles";
import { Input } from "../calculator/input.component";
import { SwapButton } from "../calculator/swap-button.component";
import { Button } from "../../../../components/UI/button.component";

export const CalculatorForm = ({ isProcessing, profile, onSubmit, rates = {} }) => {
  // FORMIK & STATE
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
  });
  const { setFieldValue } = formik;
  const { type: calculatorType } = formik.values;
  const [toSendCurrency, setToSendCurrency] = useState("Soles");
  const [toReceiveCurrency, setToReceiveCurrency] = useState("Dólares");

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
      setFieldValue("amount_sent", 1000);
      setFieldValue("amount_received", 1000 / +rates.sell);
    }
  }, [rates, setFieldValue]);

  // HANDLERS
  const onSwapHandler = () => {
    setFieldValue("type", calculatorType === "sell" ? "buy" : "sell");
    setFieldValue("amount_received", calculatorType === "sell" ? +formik.values.amount_sent * +rates.buy : +formik.values.amount_sent / +rates.sell);
  };

  const onChange = (name, value) => {
    setFieldValue(name, value);
    let conversionType;

    if (name === "amount_sent") {
      conversionType = calculatorType === "sell" ? "divide" : "multiply";
      setFieldValue("amount_received", conversionType === "divide" ? +value / rates.sell : +value * rates.sell);
    } else {
      conversionType = calculatorType === "sell" ? "multiply" : "divide";
      setFieldValue("amount_sent", conversionType === "divide" ? +value / rates.buy : +value * rates.buy);
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
      <CouponWrapper>
        <CouponInput label="Agregar cupón" />
        <CouponButton>Agregar</CouponButton>
      </CouponWrapper>
      <Spacer variant="top" />
      <Button onPress={formik.handleSubmit} disabled={!formik.isValid || isProcessing} loading={isProcessing}>
        Comenzar cambio
      </Button>
    </FormWrapper>
  );
};
