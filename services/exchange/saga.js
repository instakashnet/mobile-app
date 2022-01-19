import { put, all, call, takeEvery, takeLatest, fork } from "redux-saga/effects";
import * as types from "./types";
import * as actions from "./actions";
import { getUserData } from "../profile/actions";
import { exchangeInstance } from "../exchange.service";
import * as RootNavigation from "../../navigation/root.navigation";
import { removeData } from "../../hooks/use-storage.hook";

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
      yield call(removeData, "@selectedBank");
      yield call(removeData, "@selectedAcc");
      yield put(actions.createOrderSuccess(res.data));
      yield call([RootNavigation, "replace"], "Accounts");
    }
  } catch (error) {
    yield put(actions.exchangeError(error.message));
  }
}

function* watchContinueOrder() {
  yield takeLatest(types.CONTINUE_ORDER_INIT, continueOrder);
}

function* continueOrder({ values, orderId }) {
  const orderValues = {
    ...values,
    funds_origin: values.funds_input || values.funds_origin,
  };

  try {
    const res = yield exchangeInstance.put(`/order/step-3/${orderId}`, orderValues);
    if (res.status === 200) {
      yield put(getUserData());
      yield put(actions.continueOrderSuccess(res.data));
      yield call([RootNavigation, "replace"], "TransferCode");
      yield call(removeData, "@selectedBank");
      yield call(removeData, "@selectedAcc");
    }
  } catch (error) {
    yield put(actions.exchangeError(error.message));
  }
}

function* watchValidateCoupon() {
  yield takeEvery(types.VALIDATE_COUPON_INIT, validateCoupon);
}

function* validateCoupon({ couponName, profileType }) {
  try {
    const res = yield exchangeInstance.get(`coupons/${couponName.toUpperCase()}/${profileType}`);
    if (res.status === 200) yield put(actions.validateCouponSuccess({ ...res.data, name: couponName.toUpperCase() }));
  } catch (error) {
    yield put(actions.exchangeError(error.message));
  }
}

function* watchCancelOrder() {
  yield takeLatest(types.CANCEL_ORDER_INIT, cancelOrder);
}

function* cancelOrder({ orderType, orderId, screenType }) {
  const URL = orderType === "draft" ? `/order/draft/${orderId}` : `/order/cancel/${orderId}`;

  try {
    const res = yield exchangeInstance.delete(URL);
    if (res.status === 202) {
      yield put(getUserData());
      yield call([RootNavigation, "replace"], "Calculator");
      yield call(removeData, "@selectedAcc");
      yield call(removeData, "@selectedBank");

      if (screenType === "order") yield call([RootNavigation, "replace"], "MyOrders");

      yield put(actions.cancelOrderSuccess());
    }
  } catch (error) {
    yield put(actions.exchangeError(error.message));
  }
}

function* watchProcessCode() {
  yield takeLatest(types.PROCESS_CODE_INIT, processCode);
}

function* processCode({ values, orderId, screenType }) {
  try {
    const res = yield exchangeInstance.put(`order/step-4/${orderId}`, values);
    if (res.status === 200) {
      yield put(getUserData());

      if (screenType === "order") {
        yield call([RootNavigation, "replace"], "Calculator");
      } else yield call([RootNavigation, "replace"], "Completed");

      if (screenType === "order") yield call([RootNavigation, "replace"], "MyOrders");
      yield put(actions.processCodeSuccess());
    }
  } catch (error) {
    yield put(actions.exchangeError(error.message));
  }
}

function* watchCompleteOrder() {
  yield takeEvery(types.COMPLETE_ORDER_INIT, completeOrder);
}

function* completeOrder() {
  yield call([RootNavigation, "navigate"], "Activity", { screen: "MyOrders" });
  yield put(actions.completeOrderSuccess());
}

export function* exchangeSaga() {
  yield all([
    fork(watchGetRates),
    fork(watchCreateOrder),
    fork(watchCancelOrder),
    fork(watchContinueOrder),
    fork(watchProcessCode),
    fork(watchCompleteOrder),
    fork(watchValidateCoupon),
  ]);
}
