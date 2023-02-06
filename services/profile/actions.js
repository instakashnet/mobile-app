import * as types from './types';

export const getProfiles = () => ({
  type: types.GET_PROFILES_INIT,
});

export const getProfilesSuccess = (profiles) => ({
  type: types.GET_PROFILES_SUCCESS,
  profiles,
});

export const getUserData = () => ({
  type: types.GET_USER_DATA_INIT,
});

export const getUserDataSuccess = () => ({
  type: types.GET_USER_DATA_SUCCESS,
});

export const addProfile = (values) => ({
  type: types.ADD_PROFILE_INIT,
  values,
});

export const addProfileSuccess = () => ({
  type: types.ADD_PROFILE_SUCCESS,
});

export const addAddress = (values) => ({
  type: types.ADD_ADDRESS.INIT,
  values,
});

export const addAddressSuccess = () => ({
  type: types.ADD_ADDRESS.SUCCESS,
});

export const updateProfile = (values) => ({
  type: types.UPDATE_PROFILE_INIT,
  values,
});

export const updateProfileSuccess = () => ({
  type: types.UPDATE_PROFILE_SUCCESS,
});

export const updateUsername = (values) => ({
  type: types.UPDATE_USERNAME_INIT,
  values,
});

export const updateUsernameSuccess = () => ({
  type: types.UPDATE_USERNAME_SUCCESS,
});

export const selectProfile = (profile) => ({
  type: types.SELECT_PROFILE_INIT,
  profile,
});

export const selectProfileSuccess = (profile) => ({
  type: types.SELECT_PROFILE_SUCCESS,
  profile,
});

export const uploadDocument = (values, uploadType) => ({
  type: types.UPLOAD_DOCUMENT_INIT,
  values,
  uploadType,
});

export const uploadDocumentSuccess = () => ({
  type: types.UPLOAD_DOCUMENT_SUCCESS,
});

export const changePhone = (values) => ({
  type: types.CHANGE_PHONE_INIT,
  values,
});

export const changePhoneSuccess = () => ({
  type: types.CHANGE_PHONE_SUCCESS,
});

export const changeEmail = (values) => ({
  type: types.CHANGE_EMAIL_INIT,
  values,
});

export const changeEmailSuccess = () => ({
  type: types.CHANGE_EMAIL_SUCCESS,
});

export const clearProfile = () => ({
  type: types.CLEAR_PROFILE,
});

export const clearProfileError = () => ({
  type: types.CLEAR_ERROR,
});

export const profileError = (error) => ({
  type: types.API_ERROR,
  error,
});
