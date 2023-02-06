import * as types from './types';

// export const getBanks = () => ({
//   type: types.GET_BANKS_INIT,
// });

// export const getBanksSuccess = (banks) => ({
//   type: types.GET_BANKS_SUCCESS,
//   banks,
// });

// export const getCurrencies = () => ({
//   type: types.GET_CURRENCIES_INIT,
// });

// export const getCurrenciesSuccess = (currencies) => ({
//   type: types.GET_CURRENCIES_SUCCESS,
//   currencies,
// });

export const getAccounts = (accType) => ({
  type: types.GET_ACCOUNTS_INIT,
  accType,
});

export const getAccountsSuccess = (data) => ({
  type: types.GET_ACCOUNTS_SUCCESS,
  data,
});

export const getKashAccount = () => ({
  type: types.GET_KASH_ACCOUNT_INIT,
});

export const getKashAccountSuccess = (balance) => ({
  type: types.GET_KASH_ACCOUNT_SUCCESS,
  balance,
});

export const addAccount = (values, accType) => ({
  type: types.ADD_ACCOUNT_INIT,
  values,
  accType,
});

export const addAccountSuccess = () => ({
  type: types.ADD_ACCOUNT_SUCCESS,
});

export const editAccount = (values, accId) => ({
  type: types.EDIT_ACCOUNT_INIT,
  values,
  accId,
});

export const editAccountSuccess = () => ({
  type: types.EDIT_ACCOUNT_SUCCESS,
});

export const deleteAccount = (accId) => ({
  type: types.DELETE_ACCOUNT_INIT,
  accId,
});

export const deleteAccountSuccess = () => ({
  type: types.DELETE_ACCOUNT_SUCCESS,
});

export const clearAccountsError = () => ({
  type: types.CLEAR_ERROR,
});

export const accountsError = (error) => ({
  type: types.API_ERROR,
  error,
});
