import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// UTILS
import { headerOptions, headerLeft, headerRight, headerBackLeft } from "../utils/navigator.options";

// SCREENS
import { ActivityScreen } from "../../features/activity/screens/activity.screen";
import { OrderDetailsScreen } from "../../features/activity/screens/order-details.screen";

const ActivityStack = createStackNavigator();

export const ActivityNavigator = () => {
  return (
    <ActivityStack.Navigator screenOptions={({ navigation }) => ({ ...headerOptions, headerLeft, headerRight: () => headerRight(navigation) })}>
      <ActivityStack.Screen name="Dashboard" options={{ headerTitle: "Mis cambios" }} component={ActivityScreen} />
      <ActivityStack.Screen
        name="OrderDetails"
        options={({ navigation }) => ({ headerTitle: "Detalle de cambio", headerLeft: () => headerBackLeft(navigation) })}
        component={OrderDetailsScreen}
      />
    </ActivityStack.Navigator>
  );
};
