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
    case types.COMPLETE_ORDER_INIT:
    case types.CANCEL_ORDER_INIT:
    case types.PROCESS_CODE_INIT:
      return { ...state, isProcessing: true };
    case types.CREATE_ORDER_SUCCESS:
    case types.COMPLETE_ORDER_SUCCESS:
      return { ...state, isProcessing: false, order: action.order };
    case types.CANCEL_ORDER_SUCCESS:
    case types.PROCESS_CODE_SUCCESS:
      return { ...state, isProcessing: false, order: null };
    case types.CLEAR_ERROR:
      return { ...state, exchangeError: null };
    case types.API_ERROR:
      return { ...state, isProcessing: false, isLoading: false, exchangeError: action.error };
    default:
      return state;
  }
};
