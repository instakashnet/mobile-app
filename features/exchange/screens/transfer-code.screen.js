import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View } from "react-native";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder, processCode, openModal, clearExchangeError } from "../../../store/actions";

// HELPERS
import { formatAmount } from "../../../shared/helpers/funcitons";

// ASSETS
import { ExchangeImage } from "../../../assets/illustrations/exchange";
import { bankLogos } from "../relative-paths/images";

// COMPONENTS
import { Alert } from "../../../components/UI/alert.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { CopyButton } from "../../../components/UI/copy-button.component";
import { TransferCodeForm } from "../components/forms/transfer-code-form.component";
import { Loader } from "../../../components/UI/loader.component";
import { ExchangeScroll } from "../components/exchange.styles";
import { Price, ShadowCard, TransferCard, BankImage, InfoWrapper, InfoBox, Info } from "../components/transfer-code.styles";

export const TransferCodeScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    { order, isProcessing, isLoading, exchangeError } = useSelector((state) => state.exchangeReducer);

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      if (!order) navigation.popToTop();
    }, [order])
  );

  // HANDLERS
  const onCancelOrder = () => dispatch(cancelOrder("created", order.id)),
    onOpenModal = () => dispatch(openModal()),
    onSubmit = (values) => dispatch(processCode(values, order.id, onOpenModal));

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <ExchangeScroll>
        <Text variant="title">¡Último paso!</Text>
        <Spacer variant="vertical">
          <ExchangeImage />
        </Spacer>
        <Text>Transfiere desde tu banco el importe de:</Text>
        <Price>{order.currencySentSymbol + " " + formatAmount(order.amountSent)}</Price>
        <Spacer variant="top" size={2} />
        <Text>banco a transferir:</Text>
        <Spacer variant="top" />
        <ShadowCard>
          <TransferCard>
            <BankImage source={bankLogos.find((b) => b.bankName.toLowerCase() === order.bankFromName.toLowerCase()).uri} resizeMode="contain" />
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
        <Spacer variant="top" size={3} />
        <Text>
          Una vez realizado coloque el <Text variant="bold">número de operación emitido por su banco</Text> dentro del casillero mostrado debajo y debe darle al botón de "completar
          cambio".
        </Text>
        <TransferCodeForm isProcessing={isProcessing} onCancel={onCancelOrder} onSubmit={onSubmit} />
      </ExchangeScroll>
      <Alert type="error" onClose={clearExchangeError} visible={!!exchangeError}>
        {exchangeError}
      </Alert>
    </SafeArea>
  );
};
