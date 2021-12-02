import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// UTILS
import { headerOptions, headerLeft, headerRight, headerBackLeft, headerTitle } from "../utils/navigator.options";

// SCREENS
import { ActivityScreen } from "../../features/activity/screens/activity.screen";
import { AllActivityScreen } from "../../features/activity/screens/all-activity.screen";
import { OrderDetailsScreen } from "../../features/activity/screens/order-details.screen";

const ActivityStack = createStackNavigator();

export const ActivityNavigator = () => {
  return (
    <ActivityStack.Navigator screenOptions={({ navigation }) => ({ ...headerOptions, headerLeft: () => headerLeft(navigation), headerRight })}>
      <ActivityStack.Screen name="MyOrders" options={{ headerTitle: () => headerTitle("Mis cambios") }} component={ActivityScreen} />
      <ActivityStack.Screen
        name="OrderDetails"
        options={({ navigation }) => ({ headerTitle: () => headerTitle("Detalles"), headerLeft: () => headerBackLeft(navigation) })}
        component={OrderDetailsScreen}
      />
      <ActivityStack.Screen
        name="AllOrders"
        options={({ navigation }) => ({ headerTitle: () => headerTitle("Todos mis cambios"), headerLeft: () => headerBackLeft(navigation) })}
        component={AllActivityScreen}
      />
    </ActivityStack.Navigator>
  );
};
