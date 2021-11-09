import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// HELPERS
import { formatAmount } from "../../../shared/helpers/funcitons";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../../store/actions";

// COMPONENTS
import { EmptyActivity } from "../components/empty-activity.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Link } from "../../../components/typography/link.component";
import { ActivityScroll, OrdersWrapper, Title, Card, ShowButton } from "../components/activity.styles";
import { OrderItem } from "../components/order-item.component";
import { Loader } from "../../../components/UI/loader.component";
import { Spacer } from "../../../components/utils/spacer.component";

export const ActivityScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    { orders, withdrawals, isLoading, transfered } = useSelector((state) => state.activityReducer),
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

  return (
    <SafeArea>
      {isLoading ? (
        <Loader />
      ) : (
        <ActivityScroll>
          {orders.length <= 0 && withdrawals.length <= 0 && <EmptyActivity />}
          {orders.length > 0 && (
            <>
              <Spacer variant="top" />
              <OrdersWrapper>
                <Title>
                  <Text variant="subtitle">Últimos cambios</Text>
                  <Ionicons name="swap-horizontal-outline" color="#0D8284" size={25} />
                </Title>
                {orders.map((order) => (
                  <OrderItem key={order.id} order={order} onOpen={() => navigation.navigate("OrderDetails", { order })} />
                ))}
                <Spacer variant="top" />
                <Link>
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
