import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// UTILS
import { headerOptions, headerLeft, headerBackLeft, headerRight } from "../utils/navigator.options";

// NAVIGATORS
import { AffiliatesTabs } from "../tabs/affiliates-tabs.navigator";

// SCREENS
import { EditCodeScreen } from "../../features/affiliates/screens/edit-code.screen";

const AffiliateStack = createStackNavigator();

export const AffiliateCodeNavigator = () => {
  return (
    <AffiliateStack.Navigator
      screenOptions={({ navigation }) => ({
        ...headerOptions,
        headerLeft,
        headerRight: () => headerRight(navigation),
        headerTitle: "Comparte tu código",
      })}
    >
      <AffiliateStack.Screen name="AffiliateTabs" component={AffiliatesTabs} />
      <AffiliateStack.Screen name="EditCode" options={({ navigation }) => ({ headerLeft: () => headerBackLeft(navigation) })} component={EditCodeScreen} />
    </AffiliateStack.Navigator>
  );
};
