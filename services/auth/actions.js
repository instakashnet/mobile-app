import * as types from "./types";

export const loadUser = () => ({
  type: types.LOAD_USER_INIT,
});

export const loadUserSuccess = (user) => ({
  type: types.LOAD_USER_SUCCESS,
  user,
});

export const registerUser = (values) => ({
  type: types.REGISTER_INIT,
  values,
});

export const registerUserSuccess = () => ({
  type: types.REGISTER_SUCCESS,
});

export const loginUser = (values) => ({
  type: types.LOGIN_INIT,
  values,
});

export const loginUserSuccess = () => ({
  type: types.LOGIN_SUCCESS,
});

export const loginGoogle = (token) => ({
  type: types.LOGIN_GOOGLE_INIT,
  token,
});

export const loginGoogleSuccess = () => ({
  type: types.LOGIN_GOOGLE_SUCCESS,
});

export const loginBiometrics = (email) => ({
  type: types.LOGIN_BIOMETRICS_INIT,
  email,
});

export const loginBiometricsSuccess = () => ({
  type: types.LOGIN_BIOMETRICS_SUCCESS,
});

export const recoverPassword = (values) => ({
  type: types.RECOVER_PASSWORD_INIT,
  values,
});

export const recoverPasswordSuccess = () => ({
  type: types.RECOVER_PASSWORD_SUCCESS,
});

export const resetPassword = (values) => ({
  type: types.RESET_PASSWORD_INIT,
  values,
});

export const resetPasswordSuccess = () => ({
  type: types.RESET_PASSWORD_SUCCESS,
});

export const validateEmail = (values, codeType) => ({
  type: types.VALIDATE_EMAIL_INIT,
  values,
  codeType,
});

export const validateEmailSuccess = () => ({
  type: types.VALIDATE_EMAIL_SUCCESS,
});

export const refreshCode = () => ({
  type: types.REFRESH_CODE_INIT,
});

export const refreshCodeSuccess = () => ({
  type: types.REFRESH_CODE_SUCCESS,
});

export const completeProfile = (values) => ({
  type: types.COMPLETE_PROFILE_INIT,
  values,
});

export const completeProfileSuccess = () => ({
  type: types.COMPLETE_PROFILE_SUCCESS,
});

export const getAffiliates = () => ({
  type: types.GET_AFFILIATES_INIT,
});

export const getAffiliatesSuccess = (affiliates) => ({
  type: types.GET_AFFILIATES_SUCCESS,
  affiliates,
});

export const setIsBiometricsValues = (user, setBiometrics = null) => ({
  type: types.SET_BIOMETRCIS_VALUES.INIT,
  setBiometrics,
  user,
});

export const setBiometricsValuesSuccess = () => ({
  type: types.SET_BIOMETRCIS_VALUES.SUCCESS,
});

export const logoutUser = (logType) => ({
  type: types.LOGOUT_INIT,
  logType,
});

export const logoutUserSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

export const clearAuthError = () => ({
  type: types.CLEAR_ERROR,
});

export const authError = (error) => ({
  type: types.API_ERROR,
  error,
});
