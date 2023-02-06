import * as types from './types';

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
    case types.GET_USER_DATA_INIT:
      return { ...state, isLoading: true, profileError: null };

    case types.GET_USER_DATA_SUCCESS:
      return { ...state, isLoading: false };
    case types.GET_PROFILES_SUCCESS:
      return { ...state, isLoading: false, profiles: action.profiles };

    case types.ADD_PROFILE_INIT:
    case types.UPDATE_PROFILE_INIT:
    case types.UPLOAD_DOCUMENT_INIT:
    case types.UPDATE_USERNAME_INIT:
    case types.CHANGE_PHONE_INIT:
    case types.CHANGE_EMAIL_INIT:
    case types.ADD_ADDRESS.INIT:
      return { ...state, isProcessing: true, profileError: null };
    case types.ADD_PROFILE_SUCCESS:
    case types.UPDATE_PROFILE_SUCCESS:
    case types.UPLOAD_DOCUMENT_SUCCESS:
    case types.UPDATE_USERNAME_SUCCESS:
    case types.CHANGE_PHONE_SUCCESS:
    case types.CHANGE_EMAIL_SUCCESS:
    case types.ADD_ADDRESS.SUCCESS:
      return { ...state, isProcessing: false };

    case types.SELECT_PROFILE_SUCCESS:
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
