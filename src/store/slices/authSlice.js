import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  isSignedIn: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload: token }) => ({ ...state, token }),
    setCredentials: (state, { payload: { accessToken, user } }) => ({ ...state, token: accessToken, user, isSignedIn: true }),
    setUser: (state, { payload: user }) => ({ ...state, user }),
    setLogout: () => ({ token: null, isSignedIn: false, user: null }),
  },
})

export const { setLogout, setUser, setToken, setCredentials } = authSlice.actions

// SELECTORS
export const selectAuthToken = state => state.auth.token
export const selectUser = state => state.auth.user
export const selectIsSignedIn = state => state.auth.isSignedIn

export default authSlice.reducer
