import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// UTILS
import { headerOptions, headerLeft, headerRight, headerTitle } from '../utils/navigator.options';

// SCREENS
import { ActivityScreen } from '../../features/activity/screens/activity.screen';
import { AllActivityScreen } from '../../features/activity/screens/all-activity.screen';
import { OrderDetailsScreen } from '../../features/activity/screens/order-details.screen';

const ActivityStack = createNativeStackNavigator();

export const ActivityNavigator = () => {
  return (
    <ActivityStack.Navigator screenOptions={{ ...headerOptions, headerRight }}>
      <ActivityStack.Screen
        name='MyOrders'
        options={({ navigation }) => ({ headerTitle: () => headerTitle('Mis cambios'), headerLeft: () => headerLeft(navigation) })}
        component={ActivityScreen}
      />
      <ActivityStack.Screen name='OrderDetails' options={{ headerTitle: () => headerTitle('Detalles') }} component={OrderDetailsScreen} />
      <ActivityStack.Screen name='AllOrders' options={{ headerTitle: () => headerTitle('Todos mis cambios') }} component={AllActivityScreen} />
    </ActivityStack.Navigator>
  );
};
