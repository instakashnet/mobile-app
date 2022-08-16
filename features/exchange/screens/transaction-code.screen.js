import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { TimeBellIcon } from "../../../assets/icons/time-bell";
import { Text } from "../../../components/typography/text.component";
import { cancelOrder } from "../../../store/actions";
// COMPONENTS
import { Alert } from "../../../components/UI/alert.component";
import { Button } from "../../../components/UI/button.component";
import { Loader } from "../../../components/UI/loader.component";
import { Modal } from "../../../components/UI/modal.component";
import { KeyboardScrollAware } from "../../../components/utils/keyboard-scroll.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { clearExchangeError, closeModal, openModal, processCode } from "../../../store/actions";
import { TimerInfo } from "../components/calculator.styles";
import { StepsProgressWrapper } from "../components/exchange.styles";
import { TransferCodeForm } from "../components/forms/transfer-code-form.component";
import { ProgressIndicator } from "../components/progress-indicator.component";
import { CountdownTimer } from "../components/timer.component";
// STYLED COMPONENTS
import { TransferWrapper } from "../components/transfer-code.styles";

export const TransactionCodeScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    [countdown, setCountdown] = useState(1),
    { order, isProcessing, isLoading, exchangeError } = useSelector((state) => state.exchangeReducer);

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      if (!order.id) return navigation.popToTop();

      return () => dispatch(clearExchangeError());
    }, [order])
  );

  // HANDLERS
  const onCancelOrder = () => dispatch(cancelOrder("created", order.id, "exchange")),
    handleOrderTimeout = () => dispatch(openModal()),
    handleTimeoutCancel = () => {
      onCancelOrder();
      setCountdown(Math.random());
      dispatch(closeModal());
    },
    onSubmit = (values) => dispatch(processCode(values, order.id, "exchange"));

  let now = new Date().getTime(),
    orderExpire = new Date(order?.expiredAt).getTime(),
    expireTime = (orderExpire - now) / 10000;

  return (
    <SafeArea>
      {isLoading && <Loader />}
      {order.id ? (
        <>
          <KeyboardScrollAware>
            <TransferWrapper>
              <Spacer variant="top" size={2} />
              <StepsProgressWrapper>
                <ProgressIndicator labels={["Selecciona", "Transfiere", "Confirma"]} currentPos={2} />
              </StepsProgressWrapper>
              <Spacer variant="top" size={3} />
              <Text variant="title">Ingresa tu número de operación</Text>
              <Spacer variant="top" />
              <TransferCodeForm isProcessing={isProcessing} direct={!!order?.bankFromClientActive} onCancel={() => navigation.goBack()} onSubmit={onSubmit} />
              <TimerInfo>
                <Text variant="button">Tiempo para completar la operación:</Text>
                <CountdownTimer countdown={countdown} onFinish={handleOrderTimeout} duration={expireTime} />
              </TimerInfo>
            </TransferWrapper>
          </KeyboardScrollAware>
          <Alert type="error" onClose={clearExchangeError} visible={!!exchangeError}>
            {exchangeError}
          </Alert>
          <Modal dismissable={false}>
            <TimeBellIcon />
            <Text variant="subtitle">¡Se acabó el tiempo!</Text>
            <Spacer variant="top" />
            <Text style={{ textAlign: "center" }}>Los 15 minutos para completar la operación han finalizado. Deberás crear una nueva operación para hacer tu cambio.</Text>
            <Spacer variant="top" size={2} />
            <Button onPress={handleTimeoutCancel}>Aceptar</Button>
          </Modal>
        </>
      ) : null}
    </SafeArea>
  );
};
