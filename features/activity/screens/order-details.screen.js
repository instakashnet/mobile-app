import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder, processCode, clearExchangeError } from "../../../store/actions";

// FUNCTIONS
import { formatAmount } from "../../../shared/helpers/functions";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { KeyboardScrollAware } from "../../../components/utils/keyboard-scroll.component";
import { Alert } from "../../../components/UI/alert.component";
import { TransferCodeForm } from "../../../features/exchange/components/forms/transfer-code-form.component";

// STYLED COMPONENTS
import { ActivityWrapper, Card, InfoWrapper, Badge, Status, BankLogo } from "../components/activity.styles";

export const OrderDetailsScreen = ({ route }) => {
  const { order } = route.params,
    dispatch = useDispatch(),
    { isProcessing, exchangeError } = useSelector((state) => state.exchangeReducer);

  // HANDLERS
  const onCancelOrder = () => dispatch(cancelOrder("created", order.id, "order")),
    onSubmit = (values) => dispatch(processCode(values, order.id, "order"));

  return (
    <SafeArea>
      <KeyboardScrollAware>
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
              <Text variant="bold">Pedido:</Text>
              <Text>{order.uuid}</Text>
            </InfoWrapper>
            <InfoWrapper>
              <Text variant="bold">A enviar:</Text>
              <Text>
                {order.currencySentSymbol} {formatAmount(order.amountSent)}
              </Text>
            </InfoWrapper>
            <InfoWrapper>
              <Text variant="bold">A recibir:</Text>
              <Text>
                {order.currencyReceivedSymbol} {formatAmount(order.amountReceived)}
              </Text>
            </InfoWrapper>
            <InfoWrapper>
              <Text variant="bold">Tipo de cambio:</Text>
              <Text>{order.rate}</Text>
            </InfoWrapper>
            <InfoWrapper>
              <Text variant="bold">Banco que recibe:</Text>
              <BankLogo source={bankLogos.find((b) => b.bankName === order.bankSent.toLowerCase()).uri} />
            </InfoWrapper>
            <InfoWrapper>
              <Text variant="bold">Cuenta que recibe:</Text>
              <Text>******{order.accountToRaw.substring(order.accountToRaw.length - 5, order.accountToRaw)}</Text>
            </InfoWrapper>

            {order.estateId === 2 && (
              <>
                <Spacer variant="top" size={2} />
                <Text variant="subtitle">completar orden</Text>
                <TransferCodeForm isProcessing={isProcessing} direct={!!order?.bankFromClientActive} onSubmit={onSubmit} onCancel={onCancelOrder} />
              </>
            )}
          </Card>
        </ActivityWrapper>
      </KeyboardScrollAware>
      <Alert type="error" onClose={clearExchangeError} visible={!!exchangeError}>
        {exchangeError}
      </Alert>
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
