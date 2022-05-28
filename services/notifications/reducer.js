import * as types from "./types";
const initalState = {
  notifications: [],
  isLoading: true,
  notificationsError: null,
};

export const notificationsReducer = (state = initalState, action = {}) => {
  switch (action.type) {
    case types.GET_NOTIFICATIONS.INIT:
    case types.TOGGLE_NOTIFICACION:
    case types.SET_NOTIFICATIONS_RATES.INIT:
      return { ...state, isLoading: true };
    case types.GET_NOTIFICATIONS.SUCCESS:
      return { ...state, isLoading: false, notifications: action.notifications };
    case types.CLEAR_ERROR:
      return { ...state, notificationsError: null };
    case types.NOTIFICATIONS_ERROR:
      return { ...state, notificationsError: action.error, isLoading: false };
    default:
      return state;
  }
};
