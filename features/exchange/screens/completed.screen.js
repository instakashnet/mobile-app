import React from "react";

import { useDispatch } from "react-redux";
import { completeOrder } from "../../../store/actions";

// ASSETS
import { TransactionSuccess } from "../../../assets/illustrations/platform/transaction-success";

// COMPONENTS
import { Spacer } from "../../../components/utils/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { ExchangeWrapper } from "../components/exchange.styles";
import { Button } from "../../../components/UI/button.component";

export const CompletedScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // HANDLERS
  const onCompleteOrder = () => {
    navigation.replace("Calculator");
    dispatch(completeOrder());
  };

  return (
    <SafeArea>
      <ExchangeWrapper>
        <TransactionSuccess />
        <Spacer variant="top" />
        <Text variant="title">¡Exitoso!</Text>
        <Spacer variant="top" />
        <Text>
          Tu solicitud de cambio fue recibida y será procesada en breve. <Text variant="bold">Te recordamos</Text> que nuestros tiempos base para procesar sus pedido son de{" "}
          <Text variant="bold">15 a 25 minutos.</Text>
        </Text>
        <Spacer variant="top" />
        <Text>Puedes ver el detalle de tu solicitud en la pantalla "Actividades".</Text>
        <Spacer variant="top" size={6} />
        <Button onPress={onCompleteOrder} variant="primary">
          Ver operaciones
        </Button>
      </ExchangeWrapper>
    </SafeArea>
  );
};
