import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getRates, createOrder } from "../../../store/actions";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { RatesWrapper, RateBox, Caption, Price, BorderLine, ExchangeScroll } from "../components/exchange.styles";
import { CalculatorForm } from "../components/forms/calculator-form.component";
import { Loader } from "../../../components/UI/loader.component";
import { Timer, TimerWrapper } from "../components/calculator.styles";

export const CalculatorScreen = () => {
  const dispatch = useDispatch();
  const { isLoading, isProcessing, rates } = useSelector((state) => state.exchangeReducer);
  const profile = useSelector((state) => state.profileReducer.profile);
  const [isCountdown, setIsCountdown] = useState(false);

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      dispatch(getRates());
    }, [dispatch])
  );

  useFocusEffect(
    useCallback(() => {
      setIsCountdown(true);
      return () => setIsCountdown(false);
    })
  );

  // HANDLERS
  const onSubmit = (values) => dispatch(createOrder(values));

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <ExchangeScroll>
        <Text variant="title">¡Gana cambiando con Instakash!</Text>
        <Text>Mejores tasas, mayor ahorro.</Text>
        <Spacer varaint="top" size={5} />
        <RatesWrapper>
          <RateBox>
            <Caption>Compramos</Caption>
            <Price>S/. {rates.buy || 0}</Price>
          </RateBox>
          <BorderLine />
          <RateBox>
            <Caption>Vendemos</Caption>
            <Price>S/. {rates.sell || 0}</Price>
          </RateBox>
        </RatesWrapper>
        <Spacer variant="top" size={4} />
        {!isLoading && (
          <TimerWrapper>
            <Text variant="bold">El tipo de cambio se actualizará en:</Text>
            <Timer running={isCountdown} until={300} size={15} showSeparator onFinish={() => dispatch(getRates())} timeToShow={["M", "S"]} timeLabels={{ m: "", s: "" }} />
          </TimerWrapper>
        )}
        <CalculatorForm isProcessing={isProcessing} profile={profile} rates={rates} onSubmit={onSubmit} />
      </ExchangeScroll>
    </SafeArea>
  );
};
