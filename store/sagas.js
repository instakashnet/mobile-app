import { all } from "redux-saga/effects";

// SAGAS
import { authSaga } from "../services/auth/saga";
import { profileSaga } from "../services/profile/saga";
import { exchangeSaga } from "../services/exchange/saga";
import { accountsSaga } from "../services/accounts/saga";
import { activitySaga } from "../services/activity/saga";
import { settingsSaga } from "../services/settings/saga";
import { socketSaga } from "../services/socket/saga";

export function* rootSaga() {
  yield all([authSaga(), profileSaga(), exchangeSaga(), accountsSaga(), activitySaga(), settingsSaga(), socketSaga()]);
}
