import { AUTH_ROUTE, EXCHANGE_ROUTE, baseApi } from '../api/api'

const userDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserLevel: builder.query({
      query: () => AUTH_ROUTE + '/v1/client/users/current-level',
      providesTags: ['UserLevel']
    }),
    getUserOrders: builder.query({
      query: (values) => {
        let URL = `/v1/client/order/user?from=${values.from}&limit=${values.limit}`

        return EXCHANGE_ROUTE + URL
      },
      transformResponse: (response) => {
        return response.ordersByUser
      },
      providesTags: ['Orders'],
      keepUnusedDataFor: 5
    }),
    getUserKash: builder.query({
      query: (affiliates = false) => {
        let URL = '/v1/client/users/kash-data'
        if (affiliates) URL += '?showAffiliates=' + affiliates

        return AUTH_ROUTE + URL
      },
      keepUnusedDataFor: 50
    })
  }),
  overrideExisting: true
})

export const { useGetUserLevelQuery, useGetUserOrdersQuery, useGetUserKashQuery } = userDataApi
