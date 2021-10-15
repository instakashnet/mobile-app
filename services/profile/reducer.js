import * as types from "./types";
const initialState = {
  profiles: [],
  profile: null,
  isLoading: true,
  isProcessing: false,
  profileError: null,
};

export const profileReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_PROFILES_INIT:
      return { ...state, isLoading: true, profileError: null };
    case types.GET_PROFILES_SUCCESS:
      return { ...state, isLoading: false, profiles: action.profiles };

    case types.ADD_PROFILE_INIT:
      return { ...state, isProcessing: true, profileError: null };
    case types.ADD_PROFILE_SUCCESS:
      return { ...state, isProcessing: false };

    case types.SELECT_PROFILE:
      return { ...state, profile: action.profile };
    case types.CLEAR_PROFILE:
      return { ...state, profile: null };

    case types.CLEAR_ERROR:
      return { ...state, profileError: null };

    case types.API_ERROR:
      return { ...state, isLoading: false, isProcessing: false, profileError: action.error };
    default:
      return state;
  }
};
