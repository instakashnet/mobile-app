import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// UTILS
import { headerOptions, headerLeft, headerRight } from "../utils/navigator.options";

// SCREENS
import { ActivityScreen } from "../../features/activity/screens/activity.screen";

const ActivityStack = createStackNavigator();

export const ActivityNavigator = () => {
  return (
    <ActivityStack.Navigator screenOptions={({ navigation }) => ({ ...headerOptions, headerLeft, headerRight: () => headerRight(navigation) })}>
      <ActivityStack.Screen name="Dashboard" options={{ headerTitle: "Mi actividad" }} component={ActivityScreen} />
    </ActivityStack.Navigator>
  );
};
