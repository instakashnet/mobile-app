import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// FUNCTIONS
import { formatAmount } from "../../../shared/helpers/functions";

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
            <Text variant="bold">{format(new Date(order.completedAt || order.created), "MMM. dd hh:mm aaaa", { locale: es })}</Text>
            <Badge color={order.stateColor}>
              <Status color={order.stateColor}>{order.estateName}</Status>
            </Badge>
          </InfoWrapper>
          <InfoWrapper>
            <Text variant="subtitle">Pedido:</Text>
            <Text>{order.uuid}</Text>
          </InfoWrapper>
          <InfoWrapper>
            <Text variant="subtitle">A enviar:</Text>
            <Text>
              {order.currencySentSymbol} {formatAmount(order.amountSent)}
            </Text>
          </InfoWrapper>
          <InfoWrapper>
            <Text variant="subtitle">A recibir:</Text>
            <Text>
              {order.currencyReceivedSymbol} {formatAmount(order.amountReceived)}
            </Text>
          </InfoWrapper>
          <InfoWrapper>
            <Text variant="subtitle">Tipo de cambio:</Text>
            <Text>{order.rate}</Text>
          </InfoWrapper>
          <InfoWrapper>
            <Text variant="subtitle">Banco que recibe:</Text>
            <BankLogo source={bankLogos.find((b) => b.bankName === order.bankSent.toLowerCase()).uri} />
          </InfoWrapper>
          <InfoWrapper>
            <Text variant="subtitle">Cuenta que recibe:</Text>
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
