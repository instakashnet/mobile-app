import * as types from "./types";

export const getProfiles = () => ({
  type: types.GET_PROFILES_INIT,
});

export const getProfilesSuccess = (profiles) => ({
  type: types.GET_PROFILES_SUCCESS,
  profiles,
});

export const addProfile = (values) => ({
  type: types.ADD_PROFILE_INIT,
  values,
});

export const addProfileSuccess = () => ({
  type: types.ADD_PROFILE_SUCCESS,
});

export const selectProfile = (profile) => ({
  type: types.SELECT_PROFILE,
  profile,
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
