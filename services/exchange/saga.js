import { put, all, call, takeEvery, takeLatest, fork } from "redux-saga/effects";
import * as types from "./types";
import * as actions from "./actions";
import { exchangeInstance } from "../exchange.service";
import * as RootNavigation from "../../navigation/root.navigation";

function* watchGetRates() {
  yield takeEvery(types.GET_RATES_INIT, getRates);
}

function* getRates() {
  try {
    const res = yield exchangeInstance.get("/rates");
    if (res.status === 200) yield put(actions.getRatesSuccess(res.data[0]));
  } catch (error) {
    yield put(actions.exchangeError(error.message));
  }
}

function* watchCreateOrder() {
  yield takeLatest(types.CREATE_ORDER_INIT, createOrder);
}

function* createOrder({ values }) {
  try {
    const res = yield exchangeInstance.post("/order/step-2", values);
    if (res.status === 201) {
      yield put(actions.createOrderSuccess(res.data));
      yield call([RootNavigation, "push"], "Accounts");
    }
  } catch (error) {
    yield put(actions.exchangeError(error.message));
  }
}

function* watchCompleteOrder() {
  yield takeLatest(types.COMPLETE_ORDER_INIT, completeOrder);
}

function* completeOrder({ values, orderId }) {
  try {
    const res = yield exchangeInstance.put(`/order/step-3/${orderId}`, values);
    if (res.status === 200) {
      yield put(actions.completeOrderSuccess(res.data));
      yield call([RootNavigation, "push"], "TransferCode");
    }
  } catch (error) {
    yield put(actions.exchangeError(error.message));
  }
}

function* watchCancelOrder() {
  yield takeLatest(types.CANCEL_ORDER_INIT, cancelOrder);
}

function* cancelOrder({ orderType, orderId }) {
  const URL = orderType === "draft" ? `/order/draft/${orderId}` : `/order/cancel/${orderId}`;

  try {
    const res = yield exchangeInstance.delete(URL);
    if (res.status === 202) {
      yield put(actions.cancelOrderSuccess());
      yield call([RootNavigation, "popToTop"]);
    }
  } catch (error) {
    yield put(actions.exchangeError(error.message));
  }
}

function* watchProcessCode() {
  yield takeLatest(types.PROCESS_CODE_INIT, processCode);
}

function* processCode({ values, orderId, showModal }) {
  console.log(values, orderId);

  try {
    const res = yield exchangeInstance.put(`order/step-4/${orderId}`, values);
    console.log(res);
  } catch (error) {
    yield put(actions.exchangeError(error.message));
  }
}

export function* exchangeSaga() {
  yield all([fork(watchGetRates), fork(watchCreateOrder), fork(watchCancelOrder), fork(watchCompleteOrder), fork(watchProcessCode)]);
}
