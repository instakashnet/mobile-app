import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../store/actions";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { OrderItem } from "../components/order-item.component";
import { Loader } from "../../../components/UI/loader.component";

// STYLED COMPONENTS
import { Title, ActivityWrapper } from "../components/activity.styles";

export const AllActivityScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    { orders, isLoading } = useSelector((state) => state.activityReducer);

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      dispatch(getOrders(false, 100000));
    }, [dispatch])
  );

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <ActivityWrapper>
        <Spacer variant="top" />
        <Title>
          <Text variant="subtitle">Cambios realizados</Text>
          <Ionicons name="swap-horizontal-outline" color="#0D8284" size={25} />
        </Title>
        <Spacer variant="top" />
        <FlatList data={orders} renderItem={({ item }) => <OrderItem order={item} onOpen={() => navigation.navigate("OrderDetails", { order: item })} />} />
      </ActivityWrapper>
    </SafeArea>
  );
};
