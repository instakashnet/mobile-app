import * as types from "./types";

export const getBanks = () => ({
  type: types.GET_BANKS_INIT,
});

export const getBanksSuccess = (banks) => ({
  type: types.GET_BANKS_SUCCESS,
  banks,
});

export const getCurrencies = () => ({
  type: types.GET_CURRENCIES_INIT,
});

export const getCurrenciesSuccess = (currencies) => ({
  type: types.GET_CURRENCIES_SUCCESS,
  currencies,
});

export const getAccounts = (accType) => ({
  type: types.GET_ACCOUNTS_INIT,
  accType,
});

export const getAccountsSuccess = (accounts) => ({
  type: types.GET_ACCOUNTS_SUCCESS,
  accounts,
});

export const clearError = () => ({
  type: types.CLEAR_ERROR,
});

export const accountsError = (error) => ({
  type: types.API_ERROR,
  error,
});
