import camelize from "camelize";
import * as Notifications from "expo-notifications";
import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { removeData } from "../../hooks/use-storage.hook";
import * as RootNavigation from "../../navigation/root.navigation";
import { exchangeInstance } from "../exchange.service";
import { getUserData } from "../profile/actions";
import * as actions from "./actions";
import * as types from "./types";

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

function* watchGetLastOrder() {
  yield takeEvery(types.LAST_ORDER.INIT, getLastOrder);
}

function* getLastOrder() {
  try {
    const res = yield exchangeInstance.get("/order/last-order");

    if (res.status === 200) {
      const orderData = camelize(res.data);
      yield put(actions.getLastOrderSuccess(orderData.lastOrder));

      if (orderData.hasOrder && orderData.lastOrder?.status === 2) yield call([RootNavigation, "replace"], "TransferCode");
    }
  } catch (error) {
    yield put(actions.exchangeError());
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
      yield put(actions.continueOrderSuccess(res.data));

      yield call([Notifications, "scheduleNotificationAsync"], {
        content: {
          title: "Completa tu operación",
          body: "Te queda 1 minúto para colocar el nro. de operación de tu transferencia y completar tu cambio de divisas.",
        },
        trigger: {
          seconds: 840,
        },
      });

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
      if (screenType === "order") {
        yield call(removeData, "@selectedAcc");
        yield call(removeData, "@selectedBank");
        yield call([RootNavigation, "replace"], "MyOrders");
      }
      if (screenType === "exchange") yield call([RootNavigation, "replace"], "Calculator");

      yield call([Notifications, "cancelAllScheduledNotificationsAsync"]);
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

      yield call([Notifications, "cancelAllScheduledNotificationsAsync"]);
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
    fork(watchGetLastOrder),
    fork(watchCreateOrder),
    fork(watchCancelOrder),
    fork(watchContinueOrder),
    fork(watchProcessCode),
    fork(watchCompleteOrder),
    fork(watchValidateCoupon),
  ]);
}
