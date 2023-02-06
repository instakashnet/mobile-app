import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ExchangeAlertsScreen } from '../../features/notifications/screens/alerts.screen';
import { NotificationsScreen } from '../../features/notifications/screens/notifications.screen';
import { headerBackLeft, headerOptions, headerRight, headerTitle } from '../utils/navigator.options';

const NotificationsStack = createNativeStackNavigator();

export const NotificationsNavigator = () => {
  return (
    <NotificationsStack.Navigator
      screenOptions={({ navigation }) => ({
        ...headerOptions,
        headerLeft: () => headerBackLeft(navigation),
        headerRight,
      })}
      initialRouteName='Notifications'
    >
      <NotificationsStack.Screen name='BaseNotifications' options={{ headerTitle: () => headerTitle('Notificaciones') }} component={NotificationsScreen} />
      <NotificationsStack.Screen name='ExchangeAlerts' options={{ headerTitle: () => headerTitle('Tipo de cambio'), headerLeft: null }} component={ExchangeAlertsScreen} />
    </NotificationsStack.Navigator>
  );
};
