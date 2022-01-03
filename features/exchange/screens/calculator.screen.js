import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getRates, createOrder, removeCoupon, clearExchangeError, openModal } from "../../../store/actions";

// HELPERS
import { useProfileCompleted } from "../../../hooks/use-completed.hook";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { KeyboardScrollAware } from "../../../components/utils/keyboard-scroll.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { Alert } from "../../../components/UI/alert.component";
import { CalculatorForm } from "../components/forms/calculator-form.component";
import { Loader } from "../../../components/UI/loader.component";
import { HeaderProfile } from "../components/header-profile.component";
import { Modal } from "../../../components/UI/modal.component";
import { Button } from "../../../components/UI/button.component";

// STYLED COMPONENTS
import { RatesWrapper, RateBox, Caption, Price, BorderLine } from "../components/exchange.styles";
import { Timer, TimerWrapper } from "../components/calculator.styles";

export const CalculatorScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    isFocused = useIsFocused(),
    { isLoading, isProcessing, rates, coupon, exchangeError } = useSelector((state) => state.exchangeReducer),
    user = useSelector((state) => state.authReducer.user),
    profile = useSelector((state) => state.profileReducer.profile),
    [countdown, setCountdown] = useState(1),
    [couponRates, setCouponRates] = useState(null),
    [countRunnig, setCountRunning] = useState(false),
    [percentage] = useProfileCompleted(user);

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      dispatch(getRates());

      return () => dispatch(clearExchangeError());
    }, [dispatch])
  );

  useEffect(() => {
    setCountRunning(isFocused);

    () => setCountRunning(false);
  }, [isFocused]);

  useEffect(() => {
    if (coupon) {
      setCouponRates({ buy: (+rates.buy + coupon.discount).toFixed(4), sell: (+rates.sell - coupon.discount).toFixed(4) });
    } else setCouponRates(null);
  }, [coupon]);

  // HANDLERS
  const onSubmit = (values) => {
      if (percentage < 100 && ((values.type === "sell" && values.amount_received >= 5000) || (values.type === "buy" && values.amount_sent >= 5000))) {
        return dispatch(openModal());
      } else dispatch(createOrder(values));
    },
    onRemoveCoupon = () => dispatch(removeCoupon()),
    onGetRates = () => {
      setCountdown(Math.random());
      dispatch(getRates());
      onRemoveCoupon();
    };

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <HeaderProfile profile={profile} onProfileChange={() => navigation.navigate("SelectProfile")} screen="calculator" />
      <KeyboardScrollAware>
        <Text variant="title">Las mejores tasas del perú</Text>
        <Spacer varaint="top" size={2} />
        <RatesWrapper>
          <RateBox>
            <Caption>Compramos</Caption>
            <Price>S/. {couponRates ? couponRates.buy : rates.buy}</Price>
          </RateBox>
          <BorderLine />
          <RateBox>
            <Caption>Vendemos</Caption>
            <Price>S/. {couponRates ? couponRates.sell : rates.sell}</Price>
          </RateBox>
        </RatesWrapper>
        <Spacer variant="top" size={4} />
        <TimerWrapper>
          <Text variant="bold">El tipo de cambio se actualizará:</Text>
          <Timer id={countdown.toString()} running={countRunnig} until={300} size={14} showSeparator onFinish={onGetRates} timeToShow={["M", "S"]} timeLabels={{ m: "", s: "" }} />
        </TimerWrapper>
        <CalculatorForm
          onRemoveCoupon={onRemoveCoupon}
          isReferal={user.isReferal}
          isProcessing={isProcessing}
          couponRates={couponRates}
          coupon={coupon}
          profile={profile}
          rates={rates}
          onSubmit={onSubmit}
        />
      </KeyboardScrollAware>
      <Modal>
        <MaterialCommunityIcons name="information" size={50} color="#EB9824" />
        <Spacer variant="top" size={2} />
        <Text variant="bold" style={{ textAlign: "center" }}>
          Debes completar tu perfil al 100% para poder realizar operaciones mayores a 5000 USD.
        </Text>
        <Spacer variant="top" />
        <Button onPress={() => navigation.navigate("Profile")}>Completar perfil</Button>
      </Modal>
      <Alert type="error" onClose={clearExchangeError} visible={!!exchangeError}>
        {exchangeError}
      </Alert>
    </SafeArea>
  );
};
