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

export const recoverPassword = (values, show) => ({
  type: types.RECOVER_PASSWORD_INIT,
  values,
  show,
});

export const recoverPasswordSuccess = () => ({
  type: types.RECOVER_PASSWORD_SUCCESS,
});

export const logoutUser = () => ({
  type: types.LOGOUT_INIT,
});

export const logoutUserSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

export const validateEmail = (values) => ({
  type: types.VALIDATE_EMAIL_INIT,
  values,
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

export const clearAuthError = () => ({
  type: types.CLEAR_ERROR,
});

export const apiError = (error) => ({
  type: types.API_ERROR,
  error,
});
