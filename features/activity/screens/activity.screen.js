import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// HELPERS
import { formatAmount } from "../../../shared/helpers/funcitons";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getOrders, getWithdrawals } from "../../../store/actions";

// COMPONENTS
import { EmptyActivity } from "../components/empty-activity.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Link } from "../../../components/typography/link.component";
import { ActivityScroll, OrdersWrapper, Title, Card, ShowButton } from "../components/activity.styles";
import { OrderItem } from "../components/order-item.component";
import { Loader } from "../../../components/UI/loader.component";
import { Spacer } from "../../../components/utils/spacer.component";

export const ActivityScreen = () => {
  const dispatch = useDispatch(),
    { orders, withdrawals, isLoading, transfered } = useSelector((state) => state.activityReducer),
    [savings, setSavings] = useState(0);

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      dispatch(getOrders(true, 3));
      dispatch(getWithdrawals(3));
    }, [dispatch])
  );

  useEffect(() => {
    if (transfered > 0) setSavings(transfered * 0.03);
  }, [transfered]);

  return (
    <SafeArea>
      {isLoading ? (
        <Loader />
      ) : (
        <ActivityScroll>
          {/* <EmptyActivity /> */}
          {orders.length > 0 && (
            <>
              <Spacer variant="top" />
              <OrdersWrapper>
                <Title>
                  <Ionicons name="swap-horizontal-outline" color="#0D8284" size={25} />
                  <Text variant="subtitle">Últimos cambios</Text>
                </Title>
                {orders.map((order) => (
                  <OrderItem key={order.id} order={order} />
                ))}
                <Spacer variant="top" />
                <Link>
                  <ShowButton>Mostrar todos</ShowButton>
                </Link>
              </OrdersWrapper>
              <Spacer variant="top" size={4} />
              <OrdersWrapper>
                <Text variant="subtitle">Soles cambiados</Text>
                <Card>
                  <Text variant="title">S/. {formatAmount(transfered)}</Text>
                </Card>
              </OrdersWrapper>
              <OrdersWrapper>
                <Text variant="subtitle">Ahorro aproximado</Text>
                <Card>
                  <Text variant="title">S/. {formatAmount(savings)}</Text>
                </Card>
              </OrdersWrapper>
            </>
          )}
          {withdrawals.length > 0 && (
            <>
              <Spacer variant="top" size={2} />
              <OrdersWrapper>
                <Title>
                  <Ionicons name="ios-cash" color="#0D8284" size={25} />
                  <Text variant="subtitle">Últimos retiros</Text>
                </Title>
                {withdrawals.map((withdrawals) => (
                  <OrderItem key={withdrawals.id} order={withdrawals} />
                ))}
              </OrdersWrapper>
            </>
          )}
        </ActivityScroll>
      )}
    </SafeArea>
  );
};
