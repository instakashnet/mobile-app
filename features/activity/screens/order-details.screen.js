import { format } from "date-fns";
import { es } from "date-fns/locale";
import React, { useEffect } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { Alert } from "../../../components/UI/alert.component";
import { Loader } from "../../../components/UI/loader.component";
import { KeyboardScrollAware } from "../../../components/utils/keyboard-scroll.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { TransferCodeForm } from "../../../features/exchange/components/forms/transfer-code-form.component";
// FUNCTIONS
import { formatAmount } from "../../../shared/helpers/functions";
import { cancelOrder, clearExchangeError, getOrderDetails, processCode } from "../../../store/actions";
// STYLED COMPONENTS
import { ActivityWrapper, Badge, BankLogo, Card, InfoWrapper, Status } from "../components/activity.styles";

export const OrderDetailsScreen = ({ route }) => {
  const { orderId } = route.params,
    dispatch = useDispatch(),
    { isProcessing, exchangeError } = useSelector((state) => state.exchangeReducer),
    { orderDetails: order, isLoading } = useSelector((state) => state.activityReducer);

  // HANDLERS
  const onCancelOrder = () => dispatch(cancelOrder("created", order.id, "order")),
    onSubmit = (values) => dispatch(processCode(values, order.id, "order"));

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, []);

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <KeyboardScrollAware>
        <ActivityWrapper>
          <Card>
            <Spacer variant="top" />
            <Text variant="subtitle">Detalles de mi cambio</Text>
            {order && (
              <>
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
