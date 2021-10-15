import { put, all, fork, call, takeEvery, takeLatest } from "redux-saga/effects";
import * as types from "./types";
import * as actions from "./actions";
import { authInstance } from "../auth.service";
import * as RootNavigation from "../../navigation/root.navigation";

// SAGAS
function* watchGetProfiles() {
  yield takeEvery(types.GET_PROFILES_INIT, getProfiles);
}

function* getProfiles() {
  try {
    const res = yield authInstance.get("/users/profiles");
    if (res.status === 200) yield put(actions.getProfilesSuccess(res.data.profiles));
  } catch (error) {
    console.log(error);
    yield put(actions.profileError(error.message));
  }
}

function* watchAddProfiles() {
  yield takeLatest(types.ADD_PROFILE_INIT, addProfile);
}

function* addProfile({ values }) {
  try {
    const res = yield authInstance.post("/users/profiles", values);
    if (res.status === 200) {
      yield put(actions.addProfileSuccess());
      yield call([RootNavigation, "navigate"], "SelectProfile");
    }
  } catch (error) {
    yield put(actions.profileError(error.message));
  }
}

export function* profileSaga() {
  yield all([fork(watchGetProfiles), fork(watchAddProfiles)]);
}
