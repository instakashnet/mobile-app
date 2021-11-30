import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { View } from "react-native";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getRates, createOrder, validateCoupon, removeCoupon, clearExchangeError } from "../../../store/actions";

// ASSETS
import { Male } from "../../../assets/icons/male";
import { CompanyIcon } from "../../../assets/icons/company";
import { Female } from "../../../assets/icons/female";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { KeyboardScrollAware } from "../../../components/utils/keyboard-scroll.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { Alert } from "../../../components/UI/alert.component";
import { RatesWrapper, RateBox, Caption, Price, BorderLine, ExchangeScroll, ExchangeHeader, ProfileInfo, Type } from "../components/exchange.styles";
import { CalculatorForm } from "../components/forms/calculator-form.component";
import { Loader } from "../../../components/UI/loader.component";
import { Link } from "../../../components/typography/link.component";
import { Timer, TimerWrapper } from "../components/calculator.styles";

export const CalculatorScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    isFocused = useIsFocused(),
    { isLoading, isProcessing, rates, coupon, exchangeError } = useSelector((state) => state.exchangeReducer),
    profile = useSelector((state) => state.profileReducer.profile),
    [countdown, setCountdown] = useState(1),
    [couponRates, setCouponRates] = useState(null),
    [countRunnig, setCountRunning] = useState(false);

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
  const onSubmit = (values) => dispatch(createOrder(values)),
    onGetRates = () => {
      setCountdown(Math.random());
      dispatch(getRates());
      onRemoveCoupon();
    },
    onAddCoupon = (couponName) => dispatch(validateCoupon(couponName, profile.type)),
    onRemoveCoupon = () => dispatch(removeCoupon());

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <ExchangeHeader>
        <ProfileInfo>
          {profile.type === "juridica" ? <CompanyIcon width={25} /> : profile.identitySex === "male" ? <Male width={40} /> : <Female width={40} />}
          <Spacer variant="left" />
          <View>
            <Text style={{ color: "#FFF" }}>
              {profile.razonSocial ? (profile.razonSocial.length <= 25 ? profile.razonSocial : profile.razonSocial.substring(0, 25)) : `${profile.firstName} ${profile.lastName}`}
            </Text>
            <Type>Perfil {profile.type}</Type>
          </View>
        </ProfileInfo>
        <Link style={{ borderBottomColor: "#FFF" }} onPress={() => navigation.navigate("SelectProfile")}>
          <Text style={{ color: "#FFF" }}>Cambiar perfil</Text>
        </Link>
      </ExchangeHeader>
      <KeyboardScrollAware>
        <Text variant="title">Las mejores tasas del perú</Text>
        <Spacer varaint="top" size={5} />
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
          <Timer id={countdown.toString()} running={countRunnig} until={300} size={13} showSeparator onFinish={onGetRates} timeToShow={["M", "S"]} timeLabels={{ m: "", s: "" }} />
        </TimerWrapper>
        <CalculatorForm
          isProcessing={isProcessing}
          couponRates={couponRates}
          coupon={coupon}
          onAddCoupon={onAddCoupon}
          onRemoveCoupon={onRemoveCoupon}
          profile={profile}
          rates={rates}
          onSubmit={onSubmit}
        />
      </KeyboardScrollAware>
      <Alert type="error" onClose={clearExchangeError} visible={!!exchangeError}>
        {exchangeError}
      </Alert>
    </SafeArea>
  );
};
