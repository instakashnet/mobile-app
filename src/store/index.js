import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../api/api'
import alertReducer from './slices/alert'
import authReducer from './slices/authSlice'
import appDataReducer from './slices/app-data'

const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: alertReducer,
    appData: appDataReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  devTools: true
})

export default store
