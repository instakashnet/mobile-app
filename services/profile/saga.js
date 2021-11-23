import { put, all, fork, call, takeEvery, takeLatest, select } from "redux-saga/effects";
import camelize from "camelize";
import * as types from "./types";
import { authInstance } from "../auth.service";
import * as RootNavigation from "../../navigation/root.navigation";
import * as actions from "./actions";
import { loadUserSuccess } from "../auth/actions";

// UTILS
function* getUserData() {
  const res = yield authInstance.get("/users/session");
  const user = camelize(res.data.user);
  yield put(loadUserSuccess(user));
}

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
      yield call([RootNavigation, "popToTop"]);
    }
  } catch (error) {
    yield put(actions.profileError(error.message));
  }
}

function* watchUpdateprofile() {
  yield takeLatest(types.UPDATE_PROFILE_INIT, updateProfile);
}

function* updateProfile({ values }) {
  const profileValues = {
    ...values,
    address: `${values.address}, ${values.district}, ${values.state}`,
  };

  try {
    const res = yield authInstance.put("/users/profiles", profileValues);
    if (res.status === 200) {
      yield getUserData();

      yield call([RootNavigation, "goBack"]);
      yield put(actions.updateProfileSuccess());
    }
  } catch (error) {
    yield put(actions.profileError(error.message));
  }
}

function* watchUpdateUsername() {
  yield takeLatest(types.UPDATE_USERNAME_INIT, updateUsername);
}

function* updateUsername({ values }) {
  try {
    const res = yield authInstance.put("/users/username", values);
    if (res.status === 200) {
      yield getUserData();

      yield call([RootNavigation, "goBack"]);
      yield put(actions.updateUsernameSuccess());
    }
  } catch (error) {
    yield put(actions.profileError(error.message));
  }
}

function* watchUploadDocument() {
  yield takeLatest(types.UPLOAD_DOCUMENT_INIT, uploadDocument);
}

function* uploadDocument({ values, uploadType }) {
  let URL;
  const formData = new FormData();

  if (uploadType === "frontal") {
    URL = "/users/upload-identity-photo";
    formData.append("file-one", {
      name: "front-document",
      uri: values.identityPhoto.uri,
      type: "image/jpg",
    });
  } else {
    URL = "/users/upload-identity-photo-two";
    formData.append("file-two", {
      name: "back-document",
      uri: values.identityPhotoTwo.uri,
      type: "image/jpg",
    });
  }

  try {
    const res = yield authInstance.post(URL, formData, { headers: { "Content-Type": "multipart/form-data" } });
    if (res.status === 200) {
      yield getUserData();

      yield call([RootNavigation, "goBack"]);
      yield put(actions.uploadDocumentSuccess());
    }
  } catch (error) {
    yield put(actions.profileError(error.message));
  }
}

function* watchChangePhone() {
  yield takeLatest(types.CHANGE_PHONE_INIT, changePhone);
}

function* changePhone({ values }) {
  try {
    const res = yield authInstance.put("/users/change-phone", values);
    if (res.status === 200) {
      yield getUserData();

      yield call([RootNavigation, "goBack"]);
      yield put(actions.changePhoneSuccess());
    }
  } catch (error) {
    yield put(actions.profileError(error.message));
  }
}

function* watchChangeEmail() {
  yield takeLatest(types.CHANGE_EMAIL_INIT, changeEmail);
}

function* changeEmail({ values }) {
  try {
    const res = yield authInstance.put("/users/change-email", values);
    if (res.status === 200) {
      yield getUserData();

      yield call([RootNavigation, "goBack"]);
      yield put(actions.changeEmailSuccess());
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
  yield call([RootNavigation, "navigate"], "Calculator");
}

export function* profileSaga() {
  yield all([
    fork(watchGetProfiles),
    fork(watchAddProfiles),
    fork(watchChangePhone),
    fork(watchChangeEmail),
    fork(watchSelectProfile),
    fork(watchUpdateprofile),
    fork(watchUploadDocument),
    fork(watchUpdateUsername),
  ]);
}
