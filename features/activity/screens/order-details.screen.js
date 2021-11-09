import React from "react";

// FUNCTIONS
import { formatAmount } from "../../../shared/helpers/funcitons";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { ActivityWrapper, Card, InfoWrapper, Badge, Status, Subtitle, BankLogo } from "../components/activity.styles";

export const OrderDetailsScreen = ({ route }) => {
  const { order } = route.params;

  return (
    <SafeArea>
      <ActivityWrapper>
        <Card>
          <Spacer variant="top" />
          <Text variant="subtitle">Detalles de mi cambio</Text>
          <InfoWrapper>
            <Badge color={order.stateColor} style={{ marginLeft: "auto" }}>
              <Status color={order.stateColor}>{order.estateName}</Status>
            </Badge>
          </InfoWrapper>
          <InfoWrapper>
            <Subtitle>Pedido:</Subtitle>
            <Text>{order.uuid}</Text>
          </InfoWrapper>
          <InfoWrapper>
            <Subtitle>A enviar:</Subtitle>
            <Text>
              {order.currencySentSymbol} {formatAmount(order.amountSent)}
            </Text>
          </InfoWrapper>
          <InfoWrapper>
            <Subtitle>A recibir:</Subtitle>
            <Text>
              {order.currencyReceivedSymbol} {formatAmount(order.amountReceived)}
            </Text>
          </InfoWrapper>
          <InfoWrapper>
            <Subtitle>Tipo de cambio:</Subtitle>
            <Text>{order.rate}</Text>
          </InfoWrapper>
          <InfoWrapper>
            <Subtitle>Banco que recibe:</Subtitle>
            <BankLogo source={bankLogos.find((b) => b.bankName === order.bankReceive.toLowerCase()).uri} />
          </InfoWrapper>
          <InfoWrapper>
            <Subtitle>Cuenta que recibe:</Subtitle>
            <Text>******{order.accountToRaw.substring(order.accountToRaw.length - 5, order.accountToRaw)}</Text>
          </InfoWrapper>
        </Card>
      </ActivityWrapper>
    </SafeArea>
  );
};

export const bankLogos = [
  {
    bankName: "bcp",
    uri: require("../../../assets/banks/bcp-logo.png"),
  },
  {
    bankName: "interbank",
    uri: require("../../../assets/banks/interbank-logo.png"),
  },
  {
    bankName: "bbva",
    uri: require("../../../assets/banks/bbva-logo.png"),
  },
  {
    bankName: "scotiabank",
    uri: require("../../../assets/banks/scotiabank-logo.png"),
  },
];
