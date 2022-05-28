import * as types from "./types";

export const getNotifications = () => ({
  type: types.GET_NOTIFICATIONS.INIT,
});

export const getNotificationsSuccess = (notifications) => ({
  type: types.GET_NOTIFICATIONS.SUCCESS,
  notifications,
});

export const handleNotificationsInit = (notification) => ({
  type: types.HANDLE_NOTIFICATIONS.INIT,
  notification,
});

export const toggleNotification = (notifType, enabled) => ({
  type: types.TOGGLE_NOTIFICACION,
  notifType,
  enabled,
});

export const setNotificationRates = (rates) => ({
  type: types.SET_NOTIFICATIONS_RATES.INIT,
  rates,
});

export const setNotificationRatesSuccess = () => ({
  type: types.SET_NOTIFICATIONS_RATES.SUCCESS,
});

export const clearNotificationsError = () => ({
  type: types.CLEAR_ERROR,
});

export const notificationsError = (error) => ({
  type: types.NOTIFICATIONS_ERROR,
  error,
});
