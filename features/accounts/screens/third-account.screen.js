import React from "react";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { ExchangeWrapper } from "../../exchange/components/exchange.styles";

export const AddThirdAccountScreen = ({ route }) => {
  const currencyId = route.params ? route.params.currencyToReceive : null;

  return (
    <SafeArea>
      <Text>Agrega la cuenta de un tercero para recibir tu cambio. Recuerda que debes tener pleno consentimiento del tercero para usar sus datos.</Text>
    </SafeArea>
  );
};
