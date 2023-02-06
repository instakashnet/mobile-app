import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
// SCREENS
import { EditCodeScreen } from '../../features/affiliates/screens/edit-code.screen';
// NAVIGATORS
import { AffiliatesTabs } from '../tabs/affiliates-tabs.navigator';
// UTILS
import { headerLeft, headerOptions, headerRight, headerTitle } from '../utils/navigator.options';

const AffiliateStack = createNativeStackNavigator();

export const AffiliatesNavigator = () => {
  return (
    <AffiliateStack.Navigator
      screenOptions={({ navigation }) => ({
        ...headerOptions,
        headerLeft: () => headerLeft(navigation),
        headerRight,
        headerTitle: () => headerTitle('Comparte tu código'),
      })}
    >
      <AffiliateStack.Screen name='AffiliateTabs' component={AffiliatesTabs} />
      <AffiliateStack.Screen name='EditCode' options={{ headerLeft: null }} component={EditCodeScreen} />
    </AffiliateStack.Navigator>
  );
};
