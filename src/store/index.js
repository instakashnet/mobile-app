import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from '../api/api'
import alertReducer from './slices/alert'
import appDataReducer from './slices/appData'
import authReducer from './slices/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: alertReducer,
    appData: appDataReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  devTools: true,
})

export default store
