import { all, fork, put, takeEvery } from "redux-saga/effects";
import { exchangeInstance } from "../exchange.service";
import * as actions from "./actions";
import * as types from "./types";

function* watchGetOrders() {
  yield takeEvery(types.GET_ORDERS_INIT, getOrders);
}

function* getOrders({ limit, data }) {
  try {
    const res = yield exchangeInstance.get(`/order/user?enabled=${data}&limit=${limit}`);
    if (res.status === 200) yield put(actions.getOrdersSuccess(res.data));
  } catch (error) {
    yield put(actions.activityError(error.message));
  }
}

function* watchGetOrderDetails() {
  yield takeEvery(types.GET_ORDER_DETAILS.INIT, getOrderDetails);
}

function* getOrderDetails({ id }) {
  try {
    const res = yield exchangeInstance.get(`/order/detail/${id}?type=order`);

    if (res.status === 200) yield put(actions.getOrderDetailsSuccess(res.data));
  } catch (error) {
    yield put(actions.activityError(error.message));
  }
}

function* watchGetWithdrawals() {
  yield takeEvery(types.GET_WITHDRAWALS_INIT, getWithdrawals);
}

function* getWithdrawals({ limit }) {
  try {
    const res = yield exchangeInstance.get(`/withdrawals/user?limit=${limit}`);
    if (res.status === 200) yield put(actions.getWithdrawalsSuccess(res.data));
  } catch (error) {
    yield put(actions.activityError(error.message));
  }
}

export function* activitySaga() {
  yield all([fork(watchGetOrders), fork(watchGetWithdrawals), fork(watchGetOrderDetails)]);
}
