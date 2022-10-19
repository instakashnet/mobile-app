import * as types from "./types";
const initialState = {
  showModal: false,
  isClosed: false,
  isLoading: false,
};

export const utilsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.OPEN_MODAL:
      return { ...state, showModal: true };
    case types.CLOSE_MODAL:
      return { ...state, showModal: false };
    case types.GET_SCHEDULE.PENDING:
      return { ...state, isLoading: true };
    case types.GET_SCHEDULE.SUCCESS:
      return { ...state, isLoading: false, isClosed: action.payload };
    case types.GET_SCHEDULE.FAILED:
      return { ...state, isLoading: false, isClosed: false };
    default:
      return state;
  }
};
