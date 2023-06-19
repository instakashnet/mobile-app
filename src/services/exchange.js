import { EXCHANGE_ROUTE, baseApi } from '../api/api'

const exchangeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRates: builder.query({
      query: () => EXCHANGE_ROUTE + '/v1/client/rates',
      transformResponse: (result) => {
        return { buy: Number(result[0]?.buy || 0), sell: Number(result[0]?.sell || 0), id: result[0]?.id }
      }
    }),
    getCouponData: builder.query({
      query: ({ couponName, profileType }) => EXCHANGE_ROUTE + `/v1/client/coupons/${couponName}/${profileType}`
    }),
    createExchange: builder.mutation({
      query: (values) => ({
        url: EXCHANGE_ROUTE + '/v1/client/order/step-2',
        method: 'POST',
        body: values
      })
    }),
    continueExchange: builder.mutation({
      query: ({ values, orderId }) => ({
        url: EXCHANGE_ROUTE + `/v1/client/order/step-3/${orderId}`,
        method: 'PUT',
        body: values
      }),
      invalidateTags: ['Orders']
    }),
    cancelExchange: builder.mutation({
      query: ({ orderId, cancelType }) => {
        const URL = cancelType === 'draft' ? `/v1/client/order/draft/${orderId}` : `/v1/client/order/cancel/${orderId}`

        return {
          url: EXCHANGE_ROUTE + URL,
          method: 'DELETE'
        }
      },
      invalidateTags: ['Orders']
    }),
    completeExchange: builder.mutation({
      query: ({ orderId, values }) => ({
        url: EXCHANGE_ROUTE + `/v1/client/order/step-4/${orderId}`,
        method: 'PUT',
        body: values
      }),
      invalidateTags: ['Orders']
    })
  }),
  overrideExisting: true
})

export const {
  useLazyGetRatesQuery,
  useLazyGetCouponDataQuery,
  useCreateExchangeMutation,
  useContinueExchangeMutation,
  useCancelExchangeMutation,
  useCompleteExchangeMutation
} = exchangeApi
