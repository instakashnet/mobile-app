import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TimeBellIcon } from "../../../assets/icons/time-bell";
import { Text } from "../../../components/typography/text.component";
import { Button } from "../../../components/UI/button.component";
import { CopyButton } from "../../../components/UI/copy-button.component";
import { Modal } from "../../../components/UI/modal.component";
import { KeyboardScrollAware } from "../../../components/utils/keyboard-scroll.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { formatAmount } from "../../../shared/helpers/functions";
import { cancelOrder, clearExchangeError, closeModal, openModal } from "../../../store/actions";
import { TimerInfo } from "../components/calculator.styles";
import { StepsProgressWrapper } from "../components/exchange.styles";
import { ProgressIndicator } from "../components/progress-indicator.component";
import { CountdownTimer } from "../components/timer.component";
import { BankImage, Info, InfoBox, InfoWrapper, Price, ShadowCard, TransferCard, TransferWrapper } from "../components/transfer-code.styles";
import { bankLogos } from "../relative-paths/images";

export const TransferScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    { order } = useSelector((state) => state.exchangeReducer),
    [countdown, setCountdown] = useState(1);

  useFocusEffect(
    useCallback(() => {
      if (!order) return navigation.popToTop();

      return () => dispatch(clearExchangeError());
    }, [order])
  );

  const onCancelOrder = () => dispatch(cancelOrder("created", order.id, "exchange")),
    handleOrderTimeout = () => dispatch(openModal()),
    handleTimeoutCancel = () => {
      setCountdown(Math.random());
      onCancelOrder();
      dispatch(closeModal());
    };

  let now = new Date().getTime(),
    orderExpire = new Date(order?.expiredAt || "").getTime(),
    expireTime = (orderExpire - now) / 1000;

  return (
    <SafeArea>
      {order.id ? (
        <>
          <KeyboardScrollAware>
            <TransferWrapper>
              <Spacer variant="top" size={2} />
              <StepsProgressWrapper>
                <ProgressIndicator labels={["Selecciona", "Transfiere", "Confirma"]} currentPos={1} />
              </StepsProgressWrapper>
              <Spacer variant="top" size={3} />
              <Text variant="title">Haz la transferencia</Text>
              <Text>Transfiere desde tu banca por internet el importe de:</Text>
              <Price>{order.currencySentSymbol + " " + formatAmount(order.amountSent)}</Price>
              <Spacer variant="top" />
              <View style={{ alignSelf: "flex-start" }}>
                <Text>banco a transferir:</Text>
              </View>
              <Spacer variant="top" />
              <ShadowCard>
                <TransferCard>
                  {order.bankFromName && <BankImage source={bankLogos.find((b) => b.bankName.toLowerCase() === order?.bankFromName.toLowerCase()).uri} resizeMode="contain" />}
                  <View>
                    <Text variant="button">Cuenta corriente {order.currencySent === "PEN" ? "soles" : "dólares"}</Text>
                    <InfoWrapper>
                      <Info>{order.accountFromRaw}</Info>
                      <CopyButton text={order.accountFromRaw} />
                    </InfoWrapper>
                  </View>
                </TransferCard>
              </ShadowCard>
              <Spacer variant="top" />
              <ShadowCard>
                <TransferCard>
                  <Info>Instakash SAC - 20605285105</Info>
                </TransferCard>
              </ShadowCard>
              <Spacer variant="top" size={3} />
              <InfoWrapper>
                <InfoBox>
                  <Text variant="button">Tipo de cambio</Text>
                  <Info>{order.rate}</Info>
                </InfoBox>
                <Spacer variant="right" size={4} />
                <InfoBox>
                  <Text variant="button">Monto a recibir</Text>
                  <Info>{order.currencyReceivedSymbol + " " + formatAmount(order.amountReceived)}</Info>
                </InfoBox>
              </InfoWrapper>
              <Spacer variant="top" size={2} />
              <Text variant="bold">¿Ya realizaste tu transferencia?</Text>
              <Button onPress={() => navigation.navigate("TransactionCode")}>Continuar</Button>
              <Button variant="secondary" onPress={onCancelOrder}>
                Cancelar
              </Button>
              <TimerInfo>
                <Text variant="button">Tiempo para completar la operación:</Text>
                <CountdownTimer countdown={countdown} onFinish={handleOrderTimeout} duration={expireTime} />
              </TimerInfo>
            </TransferWrapper>
          </KeyboardScrollAware>
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
