import { all, call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import * as RootNavigation from "../../navigation/root.navigation";
import { goBack } from "../../navigation/root.navigation";
import { authInstance } from "../auth.service";
import * as actions from "./actions";
import * as types from "./types";

function* watchNotifications({ notification }) {
  const isSignedIn = yield select((state) => state.authReducer.isSignedIn);

  if (isSignedIn) {
    switch (notification?.data.type) {
      case "statusChanged":
        return RootNavigation.navigate("Activity", { screen: "OrderDetails", params: { orderId: notification.data.orderId } });
      case "canceled":
        yield put(actions.cancelOrderSuccess());
        return RootNavigation.navigate("Exchange", { screen: "Calculator" });
      case "kash":
        return RootNavigation.navigate("Affiliates", {
          screen: "AffiliateTabs",
          params: {
            screen: "Myreferrals",
          },
        });
      default:
        break;
    }
  } else return;
}

function* getNotifications() {
  try {
    const res = yield authInstance.get("/notifications");

    if (res.status === 200) yield put(actions.getNotificationsSuccess(res.data.notification));
  } catch (error) {
    yield put(actions.notificationsError(error.message));
  }
}

function* toggleNotification({ notifType, enabled }) {
  try {
    const res = yield authInstance.put(`/notifications/${notifType}`, { active: enabled });

    if (res.status === 200) yield call(getNotifications);
  } catch (error) {
    yield put(actions.notificationsError(error.message));
  }
}

function* setNotificationRates({ values }) {
  const notifValues = {
    ...values,
    rateSell: +values.rateSell,
    rateBuy: +values.rateBuy,
  };

  try {
    const res = yield authInstance.post("/notifications/rate-notifications", notifValues);
    if (res.status === 200) {
      yield put(actions.setNotificationRatesSuccess());
      yield call(getNotifications);

      yield call(goBack);
    }
  } catch (error) {
    yield put(actions.notificationsError(error.message));
  }
}

export function* notificationsSaga() {
  yield all([
    yield takeEvery(types.HANDLE_NOTIFICATIONS.INIT, watchNotifications),
    yield takeEvery(types.GET_NOTIFICATIONS.INIT, getNotifications),
    yield takeEvery(types.TOGGLE_NOTIFICACION, toggleNotification),
    yield takeLatest(types.SET_NOTIFICATIONS_RATES.INIT, setNotificationRates),
  ]);
}
