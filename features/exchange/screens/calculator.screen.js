import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "../../../components/UI/alert.component";
import { Loader } from "../../../components/UI/loader.component";
import { Modal } from "../../../components/UI/modal.component";
import { KeyboardScrollAware } from "../../../components/utils/keyboard-scroll.component";
// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { clearExchangeError, closeModal, getLastOrder, getRates, openModal } from "../../../store/actions";
// STYLED COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { TimerInfo } from "../components/calculator.styles";
import { Rates } from "../components/calculator/rates.component";
import { ExchangeForm } from "../components/exchange.styles";
import { CalculatorForm } from "../components/forms/calculator-form.component";
import { HeaderProfile } from "../components/header-profile.component";
import { ModalContent } from "../components/modal-content.component";
import { CountdownTimer } from "../components/timer.component";

export const CalculatorScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    { isLoading, rates, coupon, exchangeError } = useSelector((state) => state.exchangeReducer),
    isClosed = useSelector((state) => state.utilsReducer.isClosed),
    user = useSelector((state) => state.authReducer.user),
    profile = useSelector((state) => state.profileReducer.profile),
    [couponRates, setCouponRates] = useState(null),
    [expTime, setExpTime] = useState(0),
    [countDownId, setCountDownId] = useState(undefined),
    [modalType, setModalType] = useState("");

  // HANDLERS
  const onResetCalculator = () => {
    dispatch(getRates());
    dispatch(closeModal());
    // if (user.isReferal) dispatch(validateCoupon("NUEVOREFERIDO1", profile.type));
  };

  const handleModal = (type) => {
    setModalType(type);
    dispatch(openModal());
  };

  const handleCloseModal = () => dispatch(closeModal());

  const resetCountId = () => {
    const id = new Date().getTime().toString();
    setCountDownId(id);
  };

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      dispatch(getRates());
      dispatch(getLastOrder());

      return () => dispatch(clearExchangeError());
    }, [dispatch])
  );

  useEffect(() => {
    setExpTime(300);
    resetCountId();
  }, [rates]);

  useEffect(() => {
    if (isClosed) {
      setModalType("closed");
      dispatch(openModal());
    }
  }, [isClosed]);

  useEffect(() => {
    if (coupon && +rates.buy > 0 && +rates.sell > 0) {
      setCouponRates({ buy: (+rates.buy + coupon.discount).toFixed(4), sell: (+rates.sell - coupon.discount).toFixed(4) });
    } else setCouponRates(null);
  }, [coupon, rates]);

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <KeyboardScrollAware contentContainerStyle={{ justifyContent: "center" }}>
        {profile && <HeaderProfile profile={profile} onProfileChange={() => navigation.navigate("SelectProfile")} screen="calculator" />}
        <Spacer variant="top" size={4} />
        <ExchangeForm>
          <Text variant="title">Comienza el cambio</Text>
          <Rates couponRates={couponRates} rates={rates} />
          <TimerInfo>
            <Text variant="button">La tasa se actualizará en:</Text>
            <CountdownTimer duration={expTime} countDownId={countDownId} onFinish={handleModal.bind(null, "timeout")} />
          </TimerInfo>
          <Spacer variant="top" />
          <CalculatorForm user={user} coupon={coupon} rates={rates} couponRates={couponRates} profile={profile} handleModal={handleModal} />
        </ExchangeForm>
      </KeyboardScrollAware>
      <Modal dismissable={modalType !== "timeout"}>
        <ModalContent modalType={modalType} onGetRates={onResetCalculator} onClose={handleCloseModal} navigate={navigation.navigate} />
      </Modal>
      <Alert type="error" onClose={clearExchangeError} visible={!!exchangeError}>
        {exchangeError}
      </Alert>
    </SafeArea>
  );
};
