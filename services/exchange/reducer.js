import * as types from "./types";

const initialState = {
  rates: {},
  order: null,
  isLoading: true,
  isProcessing: false,
  exchangeError: null,
};

export const exchangeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_RATES_INIT:
      return { ...state, isLoading: true };
    case types.GET_RATES_SUCCESS:
      return { ...state, isLoading: false, rates: action.rates };
    case types.CREATE_ORDER_INIT:
    case types.CANCEL_ORDER_INIT:
      return { ...state, isProcessing: true };
    case types.CREATE_ORDER_SUCCESS:
      return { ...state, isProcessing: false, order: action.order };
    case types.CANCEL_ORDER_SUCCESS:
      return { ...state, isProcessing: false, order: null };
    default:
      return state;
  }
};
