import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { topBarOptions } from '../utils/navigator.options';

// SCREENS
import { AddPersonalAccountScreen } from '../../features/accounts/screens/personal-account.screen';
import { AddThirdAccountScreen } from '../../features/accounts/screens/third-account.screen';

const TopTabsNavigator = createMaterialTopTabNavigator();

export const AddAccountTabs = ({ route }) => {
  // const currencyId = route.params ? route.params.currencyToReceive : null;

  return (
    <TopTabsNavigator.Navigator screenOptions={{ ...topBarOptions }}>
      <TopTabsNavigator.Screen name='AddPersonalAccount' options={{ tabBarLabel: 'Personal' }} component={AddPersonalAccountScreen} />
    </TopTabsNavigator.Navigator>
  );
};
