import { put, fork, all, takeEvery } from "redux-saga/effects";
import camelize from "camelize";
import * as types from "./types";
import * as actions from "./actions";
import { accountsInstance } from "../accounts.service";

function* watchGetBanks() {
  yield takeEvery(types.GET_BANKS_INIT, getBanks);
}

function* getBanks() {
  try {
    const res = yield accountsInstance.get("/banks/172");
    if (res.status === 200) yield put(actions.getBanksSuccess(res.data.banks));
  } catch (error) {
    yield put(actions.accountsError(error.message));
  }
}

function* watchGetCurrencies() {
  yield takeEvery(types.GET_CURRENCIES_INIT, getCurrencies);
}

function* getCurrencies() {
  try {
    const res = yield accountsInstance.get("/currencies/country/172");
    if (res.status === 200) yield put(actions.getCurrenciesSuccess(res.data.currencies));
  } catch (error) {
    yield put(actions.accountsError(error.message));
  }
}

function* watchGetAccounts() {
  yield takeEvery(types.GET_ACCOUNTS_INIT, getAccounts);
}

function* getAccounts({ accType }) {
  try {
    const res = yield accountsInstance.get(`/accounts?type=${accType}`);
    const accounts = camelize(res.data.accounts);
    if (res.status === 200) yield put(actions.getAccountsSuccess(accounts));
  } catch (error) {
    yield put(actions.accountsError(error.message));
  }
}

export function* accountsSaga() {
  yield all([fork(watchGetBanks), fork(watchGetCurrencies), fork(watchGetAccounts)]);
}
