import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// HELPERS
import { formatAmount } from "../../../shared/helpers/functions";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { OrderCard, Badge, Status } from "./activity.styles";

export const OrderItem = ({ order, onOpen }) => {
  return (
    <OrderCard onPress={onOpen}>
      <Badge color={order.stateColor}>
        <Status>{order.estateName}</Status>
      </Badge>
      <View>
        <Text>{order.uuid}</Text>
        <Text variant="bold">{`${order.currencyReceivedSymbol} ${formatAmount(order.amountReceived)}`}</Text>
        <Text variant="caption">{format(new Date(order.completedAt || order.created), "MMM. dd hh:mm aaaa", { locale: es })}</Text>
      </View>
      <Ionicons name="arrow-forward" color="#0D8284" size={25} />
    </OrderCard>
  );
};
