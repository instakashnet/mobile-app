import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Alert } from 'react-native'
import camelize from 'camelize'
import Toast from 'react-native-toast-message'

import { setToken, setLogout } from '../store/slices/authSlice'
import { getSecureData, removeSecureData } from '../lib/SecureStore'

export const BASE_URL = 'https://api.dev.instakash.net'
export const AUTH_ROUTE = '/auth-service/api'
export const EXCHANGE_ROUTE = '/exchange-service/api'
export const ACCOUNT_ROUTE = '/accounts-service/api'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().auth.token

    if (token && endpoint !== 'getRefresh') headers.set('x-access-token', token)

    return headers
  },
  timeout: 40000,
})

const baseQueryInterceptor = async (args, api, options) => {
  let result = await baseQuery(args, api, options)

  if (result?.error?.status === 418 && !args?.url?.includes('logout')) {
    const refreshToken = await getSecureData('refreshToken')
    const refreshResult = await baseQuery(
      {
        url: BASE_URL + AUTH_ROUTE + '/v1/client/auth/refresh',
        method: 'POST',
        headers: { 'refresh-token': refreshToken },
      },
      api,
      options,
    )

    if (refreshResult?.data) {
      api.dispatch(setToken(refreshResult?.data.accessToken))
      result = await baseQuery(args, api, options)
    } else {
      Alert.alert('Sesión terminada', 'Tu sesión ha terminado. Debes iniciar sesión nuevamente.')
      await removeSecureData('refreshToken')
      api.dispatch(setLogout())

      return refreshResult
    }
  }

  if (result?.error?.data) {
    result.error.message =
      result.error.data.error?.message ?? 'Ha ocurrido un error inesperado. Por favor intente de nuevo más tarde o comuniquese con soporte.'
  }

  if (result?.error && !result?.meta?.request.url.includes('logout') && !result?.meta?.request?.url.includes('refresh'))
    Toast.show({
      type: 'error',
      // text1: 'Algo salió mal',
      text2: result?.error?.message,
    })

  if (result.data) result.data = camelize(result.data)

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryInterceptor,
  tagTypes: [
    'Session',
    'UserLevel',
    'UserKash',
    'Withdrawals',
    'UserExchangeData',
    'Orders',
    'Accounts',
    'Profiles',
    'Notifications',
    'RatesNotifications',
  ],
  endpoints: () => ({}),
})
