import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../../../components/typography/text.component";
import { Alert } from "../../../components/UI/alert.component";
import { Button } from "../../../components/UI/button.component";
import { Loader } from "../../../components/UI/loader.component";
import { Modal } from "../../../components/UI/modal.component";
import { KeyboardScrollAware } from "../../../components/utils/keyboard-scroll.component";
// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { clearExchangeError, closeModal, createOrder, getLastOrder, getRates, openModal, removeCoupon, validateCoupon } from "../../../store/actions";
// STYLED COMPONENTS
import { ExchangeForm, FormWrapper } from "../components/exchange.styles";
import { CalculatorForm } from "../components/forms/calculator-form.component";
import { HeaderProfile } from "../components/header-profile.component";

export const CalculatorScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    isFocused = useIsFocused(),
    { isLoading, isProcessing, rates, coupon, exchangeError } = useSelector((state) => state.exchangeReducer),
    user = useSelector((state) => state.authReducer.user),
    profile = useSelector((state) => state.profileReducer.profile),
    [couponRates, setCouponRates] = useState(null),
    [couponName, setCouponName] = useState(""),
    [countdown, setCountdown] = useState(1),
    [modalType, setModalType] = useState(""),
    amountSentRef = useRef(1000),
    amountReceivedRef = useRef(0),
    formik = useFormik({
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
      onSubmit: (values) => {
        if (user.level < 3 && ((values.type === "sell" && values.amount_received >= 1000) || (values.type === "buy" && values.amount_sent >= 1000))) {
          return dispatch(openModal());
        } else dispatch(createOrder(values));
      },
    }),
    { amount_sent, amount_received, type: calculatorType } = formik.values;

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      dispatch(getRates());
      dispatch(removeCoupon());
      dispatch(getLastOrder());

      return () => dispatch(clearExchangeError());
    }, [dispatch])
  );

  useEffect(() => {
    if (coupon && +rates.buy > 0 && +rates.sell > 0) {
      setCouponRates({ buy: (+rates.buy + coupon.discount).toFixed(4), sell: (+rates.sell - coupon.discount).toFixed(4) });
    } else setCouponRates(null);
  }, [coupon, rates]);

  useEffect(() => {
    if (rates.sell > 0) {
      formik.setFieldValue("amount_sent", amountSentRef.current);
      formik.setFieldValue("amount_received", amountSentRef.current / +rates.sell);
      amountReceivedRef.current = amountSentRef.current / +rates.sell;
    }
  }, [rates, formik.setFieldValue]);

  useEffect(() => {
    if (couponRates) {
      formik.setFieldValue("amount_received", calculatorType === "buy" ? +amountSentRef.current * +couponRates.buy : +amountSentRef.current / +couponRates.sell);
    } else {
      if (+amountReceivedRef.current > 0)
        formik.setFieldValue("amount_received", calculatorType === "buy" ? +amountSentRef.current * +rates.buy : +amountSentRef.current / +rates.sell);
    }
  }, [couponRates]);

  // HANDLERS
  const onAddCoupon = useCallback(
      (name) => {
        formik.setFieldValue("couponName", name.toUpperCase());
        dispatch(validateCoupon(name, profile.type));
        setCouponName("");
      },
      [profile.type]
    ),
    onRemoveCoupon = () => {
      dispatch(removeCoupon());
      formik.setFieldValue("couponName", "");
    },
    onGetRates = useCallback(() => {
      setCountdown(Math.random());
      dispatch(getRates());
      onRemoveCoupon();
      dispatch(closeModal());

      if (user.isReferal) onAddCoupon("NUEVOREFERIDO1");
    }, [user.isReferal]),
    handleTimeout = () => {
      setModalType("timeout");
      dispatch(openModal());
    };

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <KeyboardScrollAware contentContainerStyle={{ justifyContent: "center" }}>
        {profile && <HeaderProfile profile={profile} onProfileChange={() => navigation.navigate("SelectProfile")} screen="calculator" />}
        <Spacer variant="top" size={4} />
        <ExchangeForm>
          <FormWrapper>
            <CalculatorForm
              isReferal={user.isReferal}
              couponRates={couponRates}
              coupon={coupon}
              couponName={couponName}
              setCouponName={setCouponName}
              rates={rates}
              formik={formik}
              isFocused={isFocused}
              amountSentRef={amountSentRef}
              amountReceivedRef={amountReceivedRef}
              handleTimeout={handleTimeout}
              onAddCoupon={onAddCoupon}
              onRemoveCoupon={onRemoveCoupon}
              countdown={countdown}
            />
          </FormWrapper>
          <Spacer variant="top" size={2} />
          <Button onPress={formik.handleSubmit} disabled={amount_sent <= 0 || amount_received <= 0 || couponName || isProcessing} loading={isProcessing}>
            Comenzar cambio
          </Button>
        </ExchangeForm>
      </KeyboardScrollAware>
      <Modal dismissable={modalType === "timeout"}>
        {modalType === "timeout" ? (
          <Button onPress={onGetRates}>Aceptar</Button>
        ) : (
          <>
            <MaterialCommunityIcons name="information" size={50} color="#EB9824" />
            <Spacer variant="top" size={2} />
            <Text variant="bold" style={{ textAlign: "center" }}>
              Debes completar tu perfil al 100% para poder realizar operaciones mayores a 1000 USD.
            </Text>
            <Spacer variant="top" />
            <Button onPress={() => navigation.navigate("Profile")}>Completar perfil</Button>
          </>
        )}
      </Modal>
      <Alert type="error" onClose={clearExchangeError} visible={!!exchangeError}>
        {exchangeError}
      </Alert>
    </SafeArea>
  );
};
