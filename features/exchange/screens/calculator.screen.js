import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getRates, createOrder, removeCoupon, clearExchangeError, openModal } from "../../../store/actions";

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
import { RatesWrapper, ExchangeForm, OldRatesWrapper, RateBox, Caption, Price, BorderLine } from "../components/exchange.styles";

export const CalculatorScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    isFocused = useIsFocused(),
    { isLoading, isProcessing, rates, coupon, exchangeError } = useSelector((state) => state.exchangeReducer),
    user = useSelector((state) => state.authReducer.user),
    profile = useSelector((state) => state.profileReducer.profile),
    [couponRates, setCouponRates] = useState(null);

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      dispatch(getRates());

      return () => dispatch(clearExchangeError());
    }, [dispatch])
  );

  useEffect(() => {
    if (coupon) {
      setCouponRates({ buy: (+rates.buy + coupon.discount).toFixed(4), sell: (+rates.sell - coupon.discount).toFixed(4) });
    } else setCouponRates(null);
  }, [coupon]);

  // HANDLERS
  const onSubmit = (values) => {
    if (user.level < 3 && ((values.type === "sell" && values.amount_received >= 1000) || (values.type === "buy" && values.amount_sent >= 1000))) {
      return dispatch(openModal());
    } else dispatch(createOrder(values));
  };

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <KeyboardScrollAware>
        <HeaderProfile profile={profile} onProfileChange={() => navigation.navigate("SelectProfile")} screen="calculator" />
        <ExchangeForm>
          <Spacer variant="top" />
          <Text variant="title">Las mejores tasas del perú</Text>
          <Spacer varaint="top" />
          {couponRates && (
            <>
              <OldRatesWrapper>
                <Text variant="bold">S/. {rates.buy}</Text>
                <Spacer variant="left" size={6} />
                <Text variant="bold">S/. {rates.sell}</Text>
              </OldRatesWrapper>
              <Spacer variant="top" />
            </>
          )}
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

          <CalculatorForm
            isReferal={user.isReferal}
            isProcessing={isProcessing}
            couponRates={couponRates}
            coupon={coupon}
            profile={profile}
            rates={rates}
            onSubmit={onSubmit}
            isFocused={isFocused}
            getRates={() => dispatch(getRates())}
          />
        </ExchangeForm>
      </KeyboardScrollAware>
      <Modal>
        <MaterialCommunityIcons name="information" size={50} color="#EB9824" />
        <Spacer variant="top" size={2} />
        <Text variant="bold" style={{ textAlign: "center" }}>
          Debes completar tu perfil al 100% para poder realizar operaciones mayores a 1000 USD.
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
