import * as types from "./types";

export const getOrders = (data, limit) => ({
  type: types.GET_ORDERS_INIT,
  limit,
  data,
});

export const getOrdersSuccess = (data) => ({
  type: types.GET_ORDERS_SUCCESS,
  data,
});

export const getOrderDetails = (id) => ({
  type: types.GET_ORDER_DETAILS.INIT,
  id,
});

export const getOrderDetailsSuccess = (order) => ({
  type: types.GET_ORDER_DETAILS.SUCCESS,
  order,
});

export const getWithdrawals = (limit) => ({
  type: types.GET_WITHDRAWALS_INIT,
  limit,
});

export const getWithdrawalsSuccess = (withdrawals) => ({
  type: types.GET_WITHDRAWALS_SUCCESS,
  withdrawals,
});

export const clearActivityError = () => ({
  type: types.CLEAR_ERROR,
});

export const activityError = (error) => ({
  type: types.API_ERROR,
  error,
});
