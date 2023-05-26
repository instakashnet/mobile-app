import { AUTH_ROUTE, baseApi } from '../api/api'

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: (values) => ({
        url: AUTH_ROUTE + '/v1/client/users/profiles-address',
        method: 'PUT',
        body: values
      }),
      invalidatesTags: ['Session']
    }),
    addAdditionalInfo: builder.mutation({
      query: (values) => ({
        url: AUTH_ROUTE + '/v1/client/users/profiles',
        method: 'PUT',
        body: values
      }),
      invalidatesTags: ['Session']
    })
  }),
  overrideExisting: true
})

export const { useAddAddressMutation, useAddAdditionalInfoMutation } = userApi
