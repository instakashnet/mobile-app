import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "../../../components/typography/link.component";
import { Text } from "../../../components/typography/text.component";
import { Loader } from "../../../components/UI/loader.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { formatAmount } from "../../../shared/helpers/functions";
import { getOrders } from "../../../store/actions";
import { ActivityScroll, Card, OrdersWrapper, ShowButton, Title } from "../components/activity.styles";
import { EmptyActivity } from "../components/empty-activity.component";
import { OrderItem } from "../components/order-item.component";

export const ActivityScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    { orders, isLoading, transfered } = useSelector((state) => state.activityReducer),
    [savings, setSavings] = useState(0);

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      dispatch(getOrders(true, 3));
    }, [dispatch])
  );

  useEffect(() => {
    if (transfered > 0) setSavings(transfered * 0.03);
  }, [transfered]);

  const onNavigate = () => navigation.navigate("Exchange");

  return (
    <SafeArea>
      {isLoading ? (
        <Loader />
      ) : (
        <ActivityScroll>
          {orders.length <= 0 ? (
            <EmptyActivity onNavigate={onNavigate} />
          ) : (
            <>
              <Spacer variant="top" />
              <OrdersWrapper>
                <Title>
                  <Text variant="subtitle">Últimos cambios</Text>
                  <Ionicons name="swap-horizontal-outline" color="#0D8284" size={25} />
                </Title>
                {orders.map((order) => (
                  <OrderItem key={order.id} order={order} onOpen={() => navigation.navigate("OrderDetails", { orderId: order.id })} />
                ))}
                <Spacer variant="top" />
                <Link onPress={() => navigation.navigate("AllOrders")}>
                  <ShowButton>Mostrar todos</ShowButton>
                </Link>
              </OrdersWrapper>
              <Spacer variant="top" size={4} />
              <Card>
                <Text variant="title">S/. {formatAmount(transfered)}</Text>
                <Text variant="bold">Soles cambiados</Text>
              </Card>
              <Card>
                <Text variant="title">S/. {formatAmount(savings)}</Text>
                <Text variant="bold">Ahorro aproximado</Text>
              </Card>
            </>
          )}
        </ActivityScroll>
      )}
    </SafeArea>
  );
};
