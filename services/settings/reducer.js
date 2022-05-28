import * as types from "./types";
const initialState = {
  isProcessing: false,
};

export const settingsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SAVE_PUSH_TOKEN_INIT:
      return { isProcessing: true };
    case types.SAVE_PUSH_TOKEN_SUCCESS:
      return { isProcessing: false };

    case types.API_ERROR:
      return { isProcessing: false };
    default:
      return state;
  }
};
