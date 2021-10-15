import * as types from "./types";
const initialState = {
  showModal: false,
};

export const utilsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.OPEN_MODAL:
      return { ...state, showModal: true };
    case types.CLOSE_MODAL:
      return { ...state, showModal: false };
    default:
      return state;
  }
};
