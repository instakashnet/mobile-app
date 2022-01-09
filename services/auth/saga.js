import { all, call, put, fork, takeLatest, delay, takeEvery } from "redux-saga/effects";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import camelize from "camelize";
import * as types from "./types";
import * as actions from "./actions";
import { openModal } from "../../store/actions";
import { clearProfile } from "../profile/actions";
import { getCurrencies, getBanks } from "../accounts/actions";
import { authInstance } from "../auth.service";
import * as RootNavigation from "../../navigation/root.navigation";

// UTILS
function* setAuthToken(data, type) {
  const date = new Date();
  const expDate = new Date(date.setSeconds(date.getSeconds() + data.expiresIn));

  yield call([SecureStore, "setItemAsync"], "authData", JSON.stringify({ token: data.accessToken, expires: expDate }));
  yield call([SecureStore, "setItemAsync"], "authType", type);
}

function* getData() {
  yield put(getCurrencies());
  yield put(getBanks());
}

function* clearUserData() {
  yield call([SecureStore, "deleteItemAsync"], "authData");
  yield call([AsyncStorage, "removeItem"], "profileSelected");
  yield put(clearProfile());
}

function* setAuthTimeout(timeout) {
  yield delay(timeout - 60000);
  yield put(actions.logoutUser());
}

// SAGAS
function* watchLoadUser() {
  yield takeEvery(types.LOAD_USER_INIT, loadUser);
}

function* loadUser() {
  const authData = yield call([SecureStore, "getItemAsync"], "authData");
  if (!authData) {
    yield call([AsyncStorage, "removeItem"], "profileSelected");
    return yield put(actions.logoutUserSuccess());
  }

  const { expires } = JSON.parse(authData);
  if (new Date(expires) <= new Date()) {
    yield call(clearUserData);
    return yield put(actions.logoutUserSuccess());
  }

  const authType = yield call([SecureStore, "getItemAsync"], "authType");
  if (authType === "recover") {
    yield call(clearUserData);
    return yield put(actions.logoutUserSuccess());
  }

  try {
    const res = yield authInstance.get("/users/session");
    const user = camelize(res.data.user);
    yield call([AsyncStorage, "setItem"], "@userVerification", JSON.stringify(user));

    yield put(actions.loadUserSuccess(user));

    if (!user.verified) return yield call([RootNavigation, "push"], "EmailVerification", { type: "otp" });
    if (!user.completed) return yield call([RootNavigation, "push"], "CompleteProfile");

    yield call(getData);
    yield put(actions.loginUserSuccess());

    yield call(setAuthTimeout, new Date(expires).getTime() - new Date().getTime());
  } catch (error) {
    yield put(actions.logoutUser());
  }
}

function* watchRegisterUser() {
  yield takeLatest(types.REGISTER_INIT, registerUser);
}

function* registerUser({ values }) {
  try {
    const res = yield authInstance.post(`/auth/signup`, values);
    if (res.status === 201) {
      yield call(setAuthToken, res.data, "login");
      yield put(actions.registerUserSuccess());
      yield call([RootNavigation, "push"], "EmailVerification", { type: "otp" });
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
      yield call(setAuthToken, res.data, "login");
      yield put(actions.loadUser());
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* watchLoginGoogle() {
  yield takeLatest(types.LOGIN_GOOGLE_INIT, loginGoogle);
}

function* loginGoogle({ token }) {
  try {
    const res = yield authInstance.post("/auth/google", { token });
    if (res.status === 201) {
      yield call(setAuthToken, res.data, "login");
      yield put(actions.loadUser());
      yield put(actions.loginGoogleSuccess());
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* watchRecoverPassword() {
  yield takeLatest(types.RECOVER_PASSWORD_INIT, recoverPassword);
}

function* recoverPassword({ values }) {
  try {
    const res = yield authInstance.post("/users/recover-password", values);
    if (res.status === 201) {
      yield call(setAuthToken, res.data, "recover");
      yield put(actions.recoverPasswordSuccess());
      yield call([RootNavigation, "push"], "EmailVerification", { type: "pwd" });
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* watchValidateEmail() {
  yield takeLatest(types.VALIDATE_EMAIL_INIT, validateEmail);
}

function* validateEmail({ values, codeType }) {
  try {
    const res = yield authInstance.post("/auth/verify-code", { verificationCode: `${values.otp1}${values.otp2}${values.otp3}${values.otp4}`, operation: codeType.toUpperCase() });
    if (res.status === 200) {
      yield call(setAuthToken, res.data, codeType === "pwd" ? "recover" : "login");
      if (codeType === "pwd") {
        yield call([RootNavigation, "push"], "ResetPassword");
        yield put(actions.validateEmailSuccess());
      } else yield put(actions.loadUser());
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

function* watchResetPassword() {
  yield takeLatest(types.RESET_PASSWORD_INIT, resetPassword);
}

function* resetPassword({ values }) {
  try {
    const res = yield authInstance.post("/users/reset-password", values);
    if (res.status === 201) {
      yield put(actions.resetPasswordSuccess());
      yield call([Alert, "alert"], "Exitoso", "Tu contraseña fue cambiada correctamente. Ahora puedes iniciar sesión con tu nueva contraseña.", [
        {
          text: "Aceptar",
        },
      ]);
      yield put(actions.logoutUser());
      yield call([RootNavigation, "push"], "Login");
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* watchCompleteProfile() {
  yield takeLatest(types.COMPLETE_PROFILE_INIT, completeProfile);
}

function* completeProfile({ values }) {
  const profileValues = {
    ...values,
    phone: values.phone.replace("+", ""),
  };

  try {
    const res = yield authInstance.post("/users/profiles", profileValues);
    if (res.status === 200) yield put(actions.loadUser());
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* watchGetAffiliates() {
  yield takeEvery(types.GET_AFFILIATES_INIT, getAffiliates);
}

function* getAffiliates() {
  try {
    const res = yield authInstance.get("/users/affiliates");
    const affiliates = camelize(res.data.affiliates);
    if (res.status === 200) yield put(actions.getAffiliatesSuccess(affiliates));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* watchLogoutUser() {
  yield takeLatest(types.LOGOUT_INIT, logoutUser);
}

function* logoutUser({ logType }) {
  try {
    yield authInstance.post("/auth/logout");
  } catch (error) {
    yield put(actions.apiError());
  }

  yield put(actions.logoutUserSuccess());
  yield call(clearUserData);

  if (logType === "auth") yield call([RootNavigation, "push"], "Auth");
}

export function* authSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchRegisterUser),
    fork(watchLoginUser),
    fork(watchRecoverPassword),
    fork(watchResetPassword),
    fork(watchValidateEmail),
    fork(watchRefreshCode),
    fork(watchCompleteProfile),
    fork(watchLogoutUser),
    fork(watchGetAffiliates),
    fork(watchLoginGoogle),
  ]);
}
