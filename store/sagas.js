import { all } from "redux-saga/effects";
import { accountsSaga } from "../services/accounts/saga";
import { activitySaga } from "../services/activity/saga";
// SAGAS
import { authSaga } from "../services/auth/saga";
import { exchangeSaga } from "../services/exchange/saga";
import { notificationsSaga } from "../services/notifications/saga";
import { profileSaga } from "../services/profile/saga";
import { settingsSaga } from "../services/settings/saga";
import { socketSaga } from "../services/socket/saga";
import utilsSaga from "../services/utils/saga";

export function* rootSaga() {
  yield all([authSaga(), profileSaga(), exchangeSaga(), accountsSaga(), activitySaga(), settingsSaga(), socketSaga(), notificationsSaga(), utilsSaga()]);
}
