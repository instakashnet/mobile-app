import * as types from "./types";

const initialState = {
  banks: [],
  currencies: [],
  accounts: [],
  kashBalance: 0,
  isLoading: true,
  isProcessing: false,
  accountsError: null,
};

export const accountsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_BANKS_INIT:
    case types.GET_CURRENCIES_INIT:
      return { ...state, isLoading: true, accountsError: null };
    case types.GET_ACCOUNTS_INIT:
      return { ...state, isLoading: true, accounts: [], accountsError: null };
    case types.GET_KASH_ACCOUNT_INIT:
      return { ...state, isLoading: true, accountsError: null };
    case types.ADD_ACCOUNT_INIT:
    case types.EDIT_ACCOUNT_INIT:
    case types.DELETE_ACCOUNT_INIT:
      return { ...state, isProcessing: true, accountsError: null };
    case types.GET_BANKS_SUCCESS:
      return { ...state, isLoading: false, banks: action.banks };
    case types.GET_CURRENCIES_SUCCESS:
      return { ...state, isLoading: false, currencies: action.currencies };
    case types.GET_ACCOUNTS_SUCCESS:
      return { ...state, isLoading: false, accounts: action.accounts };
    case types.GET_KASH_ACCOUNT_SUCCESS:
      return { ...state, isLoading: false, kashBalance: action.balance };
    case types.ADD_ACCOUNT_SUCCESS:
    case types.EDIT_ACCOUNT_SUCCESS:
    case types.DELETE_ACCOUNT_SUCCESS:
      return { ...state, isProcessing: false };
    case types.CLEAR_ERROR:
      return { ...state, accountsError: null };
    case types.API_ERROR:
      return { ...state, isLoading: false, isProcessing: false, accountsError: action.error };
    default:
      return state;
  }
};
