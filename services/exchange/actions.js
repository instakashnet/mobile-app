import * as types from "./types";

export const getRates = () => ({
  type: types.GET_RATES_INIT,
});

export const getRatesSuccess = (rates) => ({
  type: types.GET_RATES_SUCCESS,
  rates,
});

export const createOrder = (values) => ({
  type: types.CREATE_ORDER_INIT,
  values,
});

export const createOrderSuccess = (order) => ({
  type: types.CREATE_ORDER_SUCCESS,
  order,
});

export const cancelOrder = (orderType, orderId) => ({
  type: types.CANCEL_ORDER_INIT,
  orderType,
  orderId,
});

export const cancelOrderSuccess = () => ({
  type: types.CANCEL_ORDER_SUCCESS,
});

export const clearExchangeError = () => ({
  type: types.CLEAR_ERROR,
});

export const exchangeError = (error) => ({
  type: types.API_ERROR,
  error,
});
