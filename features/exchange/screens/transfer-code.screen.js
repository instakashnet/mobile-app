import React from "react";
import { View } from "react-native";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder, processCode, processCodeSuccess, openModal, closeModal } from "../../../store/actions";

// HELPERS
import { formatAmount } from "../../../shared/helpers/funcitons";

// ASSETS
import { ExchangeImage } from "../../../assets/illustrations/exchange";
import { bankLogos } from "../relative-paths/images";
import { TransactionSuccess } from "../../../assets/illustrations/transaction-success";

// COMPONENTS
import { Modal } from "../../../components/UI/modal.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { CopyButton } from "../../../components/UI/copy-button.component";
import { TransferCodeForm } from "../components/forms/transfer-code-form.component";
import { ExchangeScroll } from "../components/exchange.styles";
import { Button } from "../../../components/UI/button.component";
import { Price, ShadowCard, TransferCard, BankImage, InfoWrapper, InfoBox, Info } from "../components/transfer-code.styles";

export const TransferCodeScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    { order, isProcessing } = useSelector((state) => state.exchangeReducer);

  // HANDLERS
  const onCancelOrder = () => dispatch(cancelOrder("created", order.id)),
    onOpenModal = () => dispatch(openModal()),
    onCloseModal = () => {
      dispatch(closeModal());
      navigation.navigate("Home");
      dispatch(processCodeSuccess());
    },
    onSubmit = (values) => dispatch(processCode(values, order.id, onOpenModal));

  return (
    <SafeArea>
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
            <BankImage source={bankLogos.find((b) => b.bankName.toLowerCase() === order.bankToName.toLowerCase()).uri} resizeMode="contain" />
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
      <Modal>
        <TransactionSuccess />
        <Text variant="title">¡Exitoso!</Text>
        <Spacer variant="top" />
        <Text>Tu solicitud de cambio fue recibida y será procesada en breve. Puedes ver el detalle en tu pantalla de actividad.</Text>
        <Spacer variant="top" size={2} />
        <Button onPress={onCloseModal} variant="primary">
          Aceptar
        </Button>
      </Modal>
    </SafeArea>
  );
};
