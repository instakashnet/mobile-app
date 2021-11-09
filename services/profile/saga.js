import { put, all, fork, call, takeEvery, takeLatest, select } from "redux-saga/effects";
import camelize from "camelize";
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

function* watchUpdateprofile() {
  yield takeLatest(types.UPDATE_PROFILE_INIT, updateProfile);
}

function* updateProfile({ values }) {
  try {
    const res = yield authInstance.put("/users/profiles", values);
    if (res.status === 200) {
      yield call([RootNavigation, "goBack"]);
      yield put(actions.updateProfileSuccess());
    }
  } catch (error) {
    yield put(actions.profileError(error.message));
  }
}

function* watchSelectProfile() {
  yield takeEvery(types.SELECT_PROFILE_INIT, selectProfile);
}

function* selectProfile({ profile }) {
  const user = yield select((state) => state.authReducer.user);
  const camelProfile = camelize(profile);

  const profileData = { ...camelProfile, ...user };
  yield put(actions.selectProfileSuccess(profileData));
}

export function* profileSaga() {
  yield all([fork(watchGetProfiles), fork(watchAddProfiles), fork(watchSelectProfile), fork(watchUpdateprofile)]);
}
