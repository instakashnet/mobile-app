import * as types from "./types";

const initialState = {
  banks: [],
  currencies: [],
  accounts: [],
  isLoading: true,
  accountsError: null,
};

export const accountsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_BANKS_INIT:
    case types.GET_CURRENCIES_INIT:
    case types.GET_ACCOUNTS_INIT:
      return { ...state, isLoading: true, accountsError: null };
    case types.GET_BANKS_SUCCESS:
      return { ...state, isLoading: false, banks: action.banks };
    case types.GET_CURRENCIES_SUCCESS:
      return { ...state, isLoading: false, currencies: action.currencies };
    case types.GET_ACCOUNTS_SUCCESS:
      return { ...state, isLoading: false, accounts: action.accounts };
    case types.CLEAR_ERROR:
      return { ...state, accountsError: null };
    case types.API_ERROR:
      return { ...state, isLoading: false, accountsError: action.error };
    default:
      return state;
  }
};
