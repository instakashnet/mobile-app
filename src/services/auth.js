import jwtDecode from 'jwt-decode'

import { AUTH_ROUTE, baseApi } from '../api/api'
import { removeSecureData, storeSecureData } from '../lib/SecureStore'
import { setCredentials, setLogout, setToken } from '../store/slices/authSlice'

const onLoginStarted = async (_, { dispatch, queryFulfilled }) => {
  try {
    const { data } = await queryFulfilled
    dispatch(setToken(data.accessToken))
  } catch (error) {
    console.log(error)
  }
}

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: values => {
        return {
          url: AUTH_ROUTE + '/v1/client/auth/signin',
          method: 'POST',
          body: values,
        }
      },
      onQueryStarted: onLoginStarted,
      invalidatesTags: ['Session'],
    }),
    loginGoogle: builder.mutation({
      query: values => ({
        url: AUTH_ROUTE + '/v1/client/auth/google',
        method: 'POST',
        body: values,
      }),
      onQueryStarted: onLoginStarted,
    }),
    loginApple: builder.mutation({
      query: values => ({
        url: AUTH_ROUTE + '/v1/client/auth/apple',
        method: 'POST',
        body: values,
      }),
      onQueryStarted: onLoginStarted,
    }),
    register: builder.mutation({
      query: values => ({
        url: AUTH_ROUTE + '/v1/client/auth/signup',
        method: 'POST',
        body: values,
      }),
    }),
    verifyCode: builder.mutation({
      query: values => ({
        url: AUTH_ROUTE + '/v1/client/auth/verify-code',
        method: 'POST',
        body: values,
      }),
    }),
    recoverPassword: builder.mutation({
      query: values => ({
        url: AUTH_ROUTE + '/v1/client/users/recover-password',
        method: 'POST',
        body: values,
      }),
    }),
    resetPassword: builder.mutation({
      query: values => ({
        url: AUTH_ROUTE + '/v1/client/users/reset-password',
        method: 'POST',
        body: values,
      }),
    }),
    completeRegistration: builder.mutation({
      query: values => ({
        url: AUTH_ROUTE + '/v1/client/users/profiles',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Session'],
    }),
    getSession: builder.query({
      query: () => AUTH_ROUTE + '/v1/client/users/session',
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials({ accessToken: data.accessToken, user: data.user }))
        } catch (error) {
          console.log(error)
        }
      },
      transformResponse: async response => {
        const user = jwtDecode(response.idToken)
        await storeSecureData('refreshToken', response.accessToken)

        return { accessToken: response.accessToken, user: user.personData }
      },
      providesTags: ['Session'],
    }),
    getRefresh: builder.mutation({
      query: refreshToken => ({
        url: AUTH_ROUTE + '/v1/client/auth/refresh',
        method: 'POST',
        headers: {
          'refresh-token': refreshToken,
        },
      }),
      transformResponse: response => {
        const user = jwtDecode(response.idToken)
        return { accessToken: response.accessToken, user: user.personData }
      },
      invalidatesTags: ['Session'],
    }),
    savePushToken: builder.mutation({
      query: values => ({
        url: AUTH_ROUTE + '/v1/client/auth/push-token',
        method: 'POST',
        body: values,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: AUTH_ROUTE + '/v1/client/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setLogout())
          await removeSecureData('refreshToken')
          await queryFulfilled
          setTimeout(() => {
            dispatch(baseApi.util.resetApiState())
          }, 1000)
        } catch (error) {
          console.error(error)
        }
      },
    }),
  }),
  overrideExisting: true,
})

export const {
  useLoginMutation,
  useLoginGoogleMutation,
  useLoginAppleMutation,
  useRegisterMutation,
  useCompleteRegistrationMutation,
  useRecoverPasswordMutation,
  useResetPasswordMutation,
  useVerifyCodeMutation,
  useLazyGetSessionQuery,
  useGetRefreshMutation,
  useLogoutMutation,
  useSavePushTokenMutation,
} = authApi
