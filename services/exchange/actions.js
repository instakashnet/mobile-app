import * as types from "./types";

export const getRates = () => ({
  type: types.GET_RATES_INIT,
});

export const getRatesSuccess = (rates) => ({
  type: types.GET_RATES_SUCCESS,
  rates,
});

export const validateCoupon = (couponName, profileType) => ({
  type: types.VALIDATE_COUPON_INIT,
  couponName,
  profileType,
});

export const validateCouponSuccess = (coupon) => ({
  type: types.VALIDATE_COUPON_SUCCESS,
  coupon,
});

export const removeCoupon = () => ({
  type: types.REMOVE_COUPON,
});

export const getLastOrder = () => ({
  type: types.LAST_ORDER.INIT,
});

export const getLastOrderSuccess = (order) => ({
  type: types.LAST_ORDER.SUCCESS,
  order,
});

export const createOrder = (values) => ({
  type: types.CREATE_ORDER_INIT,
  values,
});

export const createOrderSuccess = (order) => ({
  type: types.CREATE_ORDER_SUCCESS,
  order,
});

export const continueOrder = (values, orderId) => ({
  type: types.CONTINUE_ORDER_INIT,
  values,
  orderId,
});

export const continueOrderSuccess = (order) => ({
  type: types.CONTINUE_ORDER_SUCCESS,
  order,
});

export const cancelOrder = (orderType, orderId, screenType) => ({
  type: types.CANCEL_ORDER_INIT,
  orderType,
  orderId,
  screenType,
});

export const cancelOrderSuccess = () => ({
  type: types.CANCEL_ORDER_SUCCESS,
});

export const processCode = (values, orderId, screenType) => ({
  type: types.PROCESS_CODE_INIT,
  values,
  orderId,
  screenType,
});

export const processCodeSuccess = () => ({
  type: types.PROCESS_CODE_SUCCESS,
});

export const completeOrder = (closeModal) => ({
  type: types.COMPLETE_ORDER_INIT,
  closeModal,
});

export const completeOrderSuccess = () => ({
  type: types.COMPLETE_ORDER_SUCCESS,
});

export const clearExchangeError = () => ({
  type: types.CLEAR_ERROR,
});

export const exchangeError = (error) => ({
  type: types.API_ERROR,
  error,
});
