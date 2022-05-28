import * as types from "./types";

export const savePushToken = (token) => ({
  type: types.SAVE_PUSH_TOKEN_INIT,
  token,
});

export const savePushTokenSuccess = () => ({
  type: types.SAVE_PUSH_TOKEN_SUCCESS,
});

export const settingsError = () => ({
  type: types.API_ERROR,
});
