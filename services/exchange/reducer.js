import * as types from "./types";

const initialState = {
  rates: { buy: 0, sell: 0 },
  order: {},
  isLoading: true,
  ratesLoading: true,
  isProcessing: false,
  exchangeError: null,
  coupon: null,
};

export const exchangeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_RATES_INIT:
      return { ...state, ratesLoading: true };
    case types.LAST_ORDER.INIT:
      return { ...state, isLoading: true };
    case types.LAST_ORDER.SUCCESS:
      return { ...state, isLoading: false, order: action.order };
    case types.GET_RATES_SUCCESS:
      return { ...state, ratesLoading: false, rates: action.rates };
    case types.CREATE_ORDER_INIT:
    case types.CONTINUE_ORDER_INIT:
    case types.PROCESS_CODE_INIT:
      return { ...state, isProcessing: true };
    case types.VALIDATE_COUPON_INIT:
      return { ...state, isLoading: true };
    case types.CANCEL_ORDER_INIT:
      return { ...state, isProcessing: true, isLoading: true };
    case types.VALIDATE_COUPON_SUCCESS:
      return { ...state, isLoading: false, coupon: action.coupon };
    case types.CREATE_ORDER_SUCCESS:
      return { ...state, isProcessing: false, order: action.order };
    case types.CONTINUE_ORDER_SUCCESS:
      return { ...state, isProcessing: false, order: action.order };
    case types.CANCEL_ORDER_SUCCESS:
      return { ...state, isProcessing: false, isLoading: false, order: {}, coupon: null };
    case types.PROCESS_CODE_SUCCESS:
      return { ...state, isProcessing: false, coupon: null };
    case types.COMPLETE_ORDER_SUCCESS:
      return { ...state, order: {} };
    case types.REMOVE_COUPON:
      return { ...state, coupon: null };
    case types.CLEAR_ERROR:
      return { ...state, exchangeError: null };
    case types.API_ERROR:
      return { ...state, isProcessing: false, isLoading: false, ratesLoading: false, exchangeError: action.error };
    default:
      return state;
  }
};
