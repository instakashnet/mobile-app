import { put, fork, all, call, takeEvery, takeLatest } from 'redux-saga/effects';
import camelize from 'camelize';
import * as types from './types';
import * as actions from './actions';
import { accountsInstance } from '../accounts.service';
import * as RootNavigator from '../../navigation/root.navigation';

// function* watchGetBanks() {
//   yield takeEvery(types.GET_BANKS_INIT, getBanks);
// }

// function* getBanks() {
//   try {
//     const res = yield accountsInstance.get('/banks/172');
//     if (res.status === 200) yield put(actions.getBanksSuccess(res.data.banks));
//   } catch (error) {
//     yield put(actions.accountsError(error.message));
//   }
// }

// function* watchGetCurrencies() {
//   yield takeEvery(types.GET_CURRENCIES_INIT, getCurrencies);
// }

// function* getCurrencies() {
//   try {
//     const res = yield accountsInstance.get('/currencies/country/172');
//     if (res.status === 200) yield put(actions.getCurrenciesSuccess(res.data.currencies));
//   } catch (error) {
//     yield put(actions.accountsError(error.message));
//   }
// }

function* watchGetAccounts() {
  yield takeEvery(types.GET_ACCOUNTS_INIT, getAccounts);
}

function* getAccounts({ accType }) {
  try {
    const dataArray = yield Promise.all([accountsInstance.get(`/accounts?type=${accType}`), accountsInstance.get('/banks/172'), accountsInstance.get('/currencies/country/172')]);

    if (dataArray?.length) {
      const [accountsRes, banksRes, currenciesRes] = dataArray;

      yield put(
        actions.getAccountsSuccess({ accounts: camelize(accountsRes.data.accounts), banks: camelize(banksRes.data.banks), currencies: camelize(currenciesRes.data.currencies) }),
      );
    }
  } catch (error) {
    yield put(actions.accountsError(error.message));
  }
}

function* watchGetKashAccount() {
  yield takeEvery(types.GET_KASH_ACCOUNT_INIT, getKashAccount);
}

function* getKashAccount() {
  try {
    const res = yield accountsInstance.get(`/accounts?type=kash`);
    if (res.status === 200) yield put(actions.getKashAccountSuccess(res.data.accounts.balance));
  } catch (error) {
    yield put(actions.accountsError(error.message));
  }
}

function* watchAddAccount() {
  yield takeLatest(types.ADD_ACCOUNT_INIT, addAccount);
}

function* addAccount({ values, accType }) {
  try {
    const res = yield accountsInstance.post('/accounts', values);
    if (res.status === 201) {
      yield put(actions.addAccountSuccess());
      if (accType === 'personal') {
        yield call([RootNavigator, 'goBack']);
      } else yield call([RootNavigator, 'pop'], 1);
    }
  } catch (error) {
    yield put(actions.accountsError(error.message));
  }
}

function* watchEditAccount() {
  yield takeLatest(types.EDIT_ACCOUNT_INIT, editAccount);
}

function* editAccount({ values, accId }) {
  try {
    const res = yield accountsInstance.put(`/accounts/${accId}`, values);
    if (res.status === 200) {
      yield put(actions.editAccountSuccess());
      yield call([RootNavigator, 'replace'], 'MyAccounts');
    }
  } catch (error) {
    yield put(actions.accountsError(error.message));
  }
}

function* watchDeleteAccount() {
  yield takeLatest(types.DELETE_ACCOUNT_INIT, deleteAccount);
}

function* deleteAccount({ accId }) {
  try {
    const res = yield accountsInstance.delete(`/accounts/${accId}`);
    if (res.status === 200) {
      yield put(actions.deleteAccountSuccess());
      yield call([RootNavigator, 'popToTop']);
    }
  } catch (error) {
    yield put(actions.accountsError(error.message));
  }
}

export function* accountsSaga() {
  yield all([
    // fork(watchGetBanks),
    // fork(watchGetCurrencies),
    fork(watchGetAccounts),
    fork(watchGetKashAccount),
    fork(watchAddAccount),
    fork(watchEditAccount),
    fork(watchDeleteAccount),
  ]);
}
