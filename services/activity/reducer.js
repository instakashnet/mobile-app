import * as types from "./types";

const initialState = {
  orders: [],
  withdrawals: [],
  transfered: 0,
  isLoading: true,
  activityError: null,
};

export const activityReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_ORDERS_INIT:
      return { ...state, isLoading: true, orders: [] };
    case types.GET_WITHDRAWALS_INIT:
      return { ...state, isLoading: true, withdrawals: [] };
    case types.GET_ORDERS_SUCCESS:
      return { ...state, isLoading: false, orders: action.data.ordersByUser.reverse(), transfered: action.data.dataOfUser || 0 };
    case types.GET_WITHDRAWALS_SUCCESS:
      return { ...state, isLoading: false, withdrawals: action.withdrawals };
    case types.CLEAR_ERROR:
      return { ...state, activityError: null };
    case types.API_ERROR:
      return { ...state, orders: [], activityError: action.error, isLoading: false };
    default:
      return state;
  }
};
