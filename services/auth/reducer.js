import { UPLOAD_DOCUMENT_SUCCESS } from '../profile/types';
import * as types from './types';

const initialState = {
  isProcessing: false,
  isLoading: false,
  user: {},
  token: null,
  isSignedIn: false,
  isSignOut: false,
  authError: null,
  affiliates: [],
};

export const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REGISTER_INIT:
    case types.LOGIN_INIT:
    case types.LOGIN_GOOGLE_INIT:
    case types.LOGIN_APPLE.INIT:
    case types.RECOVER_PASSWORD_INIT:
    case types.VALIDATE_EMAIL_INIT:
    case types.REFRESH_CODE_INIT:
    case types.COMPLETE_PROFILE_INIT:
    case types.RESET_PASSWORD_INIT:
    case types.SET_BIOMETRCIS_VALUES.INIT:
      return { ...state, isProcessing: true, error: null };
    case types.REGISTER_SUCCESS:
    case types.LOGIN_GOOGLE_SUCCESS:
    case types.RECOVER_PASSWORD_SUCCESS:
    case types.RESET_PASSWORD_SUCCESS:
    case types.VALIDATE_EMAIL_SUCCESS:
    case types.REFRESH_CODE_SUCCESS:
    case types.COMPLETE_PROFILE_SUCCESS:
    case types.RESET_PASSWORD_SUCCESS:
    case types.SET_BIOMETRCIS_VALUES.SUCCESS:
      return { ...state, isProcessing: false };
    case types.LOGIN_SUCCESS:
      return { ...state, isProcessing: false, isSignedIn: true };
    case types.LOAD_USER_INIT:
    case types.LOAD_SESSION.INIT:
      return { ...state, isLoading: true };
    case types.LOAD_SESSION.SUCCESS:
      return { ...state, isLoading: false, isProcessing: false, token: action.token };
    case types.LOAD_USER_SUCCESS:
      return { ...state, user: action.user, isLoading: false, isProcessing: false };

    case types.SET_AUTH_TOKEN:
      return { ...state, token: action.token };

    case UPLOAD_DOCUMENT_SUCCESS:
      return { ...state, user: { ...state.user, documentValidation: 'pending' } };

    case types.GET_AFFILIATES_INIT:
      return { ...state, affiliates: [] };
    case types.GET_AFFILIATES_SUCCESS:
      return { ...state, affiliates: action.affiliates, isLoading: false };
    case types.LOGOUT_INIT:
      return { ...state, isSignOut: true };
    case types.LOGOUT_SUCCESS:
      return { ...state, isLoading: false, isProcessing: false, isSignedIn: false, isSignOut: false, user: null };
    case types.CLEAR_ERROR:
      return { ...state, authError: null };
    case types.API_ERROR:
      return { ...state, isProcessing: false, isLoading: false, authError: action.error };
    default:
      return state;
  }
};
