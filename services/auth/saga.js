import { all, call, put, fork, takeLatest, takeEvery } from "redux-saga/effects";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import camelize from "camelize";
import * as types from "./types";
import * as actions from "./actions";
import { openModal } from "../../store/actions";
import { selectProfile } from "../profile/actions";
import { authInstance } from "../auth.service";
import * as RootNavigation from "../../navigation/root.navigation";

// UTILS
function* setAuthToken(data) {
  const date = new Date();
  const expDate = new Date(date.setSeconds(date.getSeconds() + data.expiresIn));

  yield call([SecureStore, "setItemAsync"], "authData", JSON.stringify({ token: data.accessToken, expires: expDate }));
}

function* clearUserData() {
  yield call([SecureStore, "deleteItemAsync"], "authData");
  yield call([AsyncStorage, "removeItem"], "profileSelected");
}

// SAGAS
function* watchLoadUser() {
  yield takeEvery(types.LOAD_USER_INIT, loadUser);
}

function* loadUser() {
  const authData = yield call([SecureStore, "getItemAsync"], "authData");
  if (!authData) return yield put(actions.logoutUserSuccess());

  const { expires } = JSON.parse(authData);
  if (new Date(expires) <= new Date()) {
    yield call(clearUserData);
    return yield put(actions.logoutUserSuccess());
  }

  try {
    const res = yield authInstance.get("/users/session");
    const resData = camelize(res.data);
    yield call([AsyncStorage, "setItem"], "@userVerification", JSON.stringify({ verified: resData.verified, completed: resData.completed, isGoogle: resData.isGoogle }));

    if (!resData.verified) {
      yield put(actions.logoutUserSuccess());
      return yield call([RootNavigation, "navigate"], "EmailVerification");
    }

    if (!resData.completed) {
      yield put(actions.logoutUserSuccess());
      return yield call([RootNavigation, "navigate"], "CompleteProfile");
    }

    const profileSelected = yield call([AsyncStorage, "getItem"], "profileSelected");

    yield put(selectProfile(profileSelected));
    yield put(actions.loadUserSuccess(resData.user));
  } catch (error) {
    console.log(error);
    yield put(actions.logoutUser());
  }
}

function* watchRegisterUser() {
  yield takeLatest(types.REGISTER_INIT, registerUser);
}

function* registerUser({ values }) {
  const registerValues = {
    ...values,
    phone: values.phone.replace("+", ""),
  };

  try {
    const res = yield authInstance.post(`/auth/signup`, registerValues);
    if (res.status === 201) {
      yield call(setAuthToken, res.data);
      yield put(actions.registerUserSuccess());
      yield call([RootNavigation, "navigate"], "EmailVerification");
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* watchLoginUser() {
  yield takeLatest(types.LOGIN_INIT, loginUser);
}

function* loginUser({ values }) {
  try {
    const res = yield authInstance.post(`/auth/signin`, values);
    if (res.status === 200) {
      yield call(setAuthToken, res.data);
      yield put(actions.loadUser());
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* watchRecoverPassword() {
  yield takeLatest(types.RECOVER_PASSWORD_INIT, recoverPassword);
}

function* recoverPassword({ values, show }) {
  try {
    const res = yield authInstance.post("/users/recover-password", values);
    if (res.status === 201) {
      yield put(actions.recoverPasswordSuccess());
      yield call(show);
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* watchValidateEmail() {
  yield takeLatest(types.VALIDATE_EMAIL_INIT, validateEmail);
}

function* validateEmail({ values }) {
  try {
    const res = yield authInstance.post("/auth/verify-code", { verificationCode: `${values.otp1}${values.otp2}${values.otp3}${values.otp4}` });
    if (res.status === 200) {
      yield call(setAuthToken, res.data);
      yield put(actions.loadUser());
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* watchRefreshCode() {
  yield takeEvery(types.REFRESH_CODE_INIT, refreshCode);
}

function* refreshCode() {
  try {
    const res = yield authInstance.get("/auth/refresh-code");
    if (res.status === 200) {
      yield put(openModal());
      yield put(actions.refreshCodeSuccess());
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* watchCompleteProfile() {
  yield takeLatest(types.COMPLETE_PROFILE_INIT, completeProfile);
}

function* completeProfile({ values }) {
  try {
    const res = yield authInstance.post("/users/profiles", values);
    if (res.status === 200) yield put(actions.loadUser());
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* watchLogoutUser() {
  yield takeLatest(types.LOGOUT_INIT, logoutUser);
}

function* logoutUser() {
  try {
    yield authInstance.post("/auth/logout");
  } catch (error) {
    yield put(actions.apiError());
  }

  yield call(clearUserData);

  yield put(actions.logoutUserSuccess());
}

export function* authSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchRegisterUser),
    fork(watchLoginUser),
    fork(watchRecoverPassword),
    fork(watchValidateEmail),
    fork(watchRefreshCode),
    fork(watchCompleteProfile),
    fork(watchLogoutUser),
  ]);
}
