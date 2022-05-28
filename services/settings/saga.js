import * as types from "./types";
import * as actions from "./actions";
import { put, takeLatest, fork, all } from "redux-saga/effects";
import { authInstance } from "../auth.service";

function* watchSavePushToken() {
  yield takeLatest(types.SAVE_PUSH_TOKEN_INIT, savePushToken);
}

function* savePushToken({ token }) {
  try {
    yield authInstance.post("/auth/push-token", { token });
    yield put(actions.savePushTokenSuccess());
  } catch (error) {
    console.log(error);
    yield put(actions.settingsError());
  }
}

export function* settingsSaga() {
  yield all([fork(watchSavePushToken)]);
}
