import { AUTH_ROUTE, baseApi, EXCHANGE_ROUTE } from '../api/api'

const exchangeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getRates: builder.query({
      query: () => EXCHANGE_ROUTE + '/v1/client/rates',
      transformResponse: result => {
        return { buy: Number(result?.buy || 0), sell: Number(result?.sell || 0), id: result?.id }
      },
      keepUnusedDataFor: 0.0001,
    }),
    getSchedule: builder.query({
      query: () => EXCHANGE_ROUTE + '/v1/client/schedules',
      keepUnusedDataFor: 60,
    }),
    getLastOrder: builder.query({
      query: () => EXCHANGE_ROUTE + '/v1/client/order/last-order',
      transformResponse: result => result.lastOrder,
      keepUnusedDataFor: 0.0001,
      providesTags: ['LastOrder'],
    }),
    getCouponData: builder.query({
      query: ({ couponName, profileType }) => EXCHANGE_ROUTE + `/v1/client/coupons/${couponName}/${profileType}`,
    }),
    checkReferralStatus: builder.query({
      query: () => AUTH_ROUTE + '/v1/client/users/referral-coupon',
      keepUnusedDataFor: 0.0001,
    }),
    createExchange: builder.mutation({
      query: values => ({
        url: EXCHANGE_ROUTE + '/v1/client/order/step-2',
        method: 'POST',
        body: values,
      }),
    }),
    continueExchange: builder.mutation({
      query: ({ values, orderId }) => ({
        url: EXCHANGE_ROUTE + `/v1/client/order/step-3/${orderId}`,
        method: 'PUT',
        body: values,
      }),
      invalidateTags: ['Orders'],
    }),
    cancelExchange: builder.mutation({
      query: ({ orderId, cancelType }) => {
        const URL = cancelType === 'draft' ? `/v1/client/order/draft/${orderId}` : `/v1/client/order/cancel/${orderId}`

        return {
          url: EXCHANGE_ROUTE + URL,
          method: 'DELETE',
        }
      },
      invalidateTags: ['Orders', 'LastOrder'],
    }),
    completeExchange: builder.mutation({
      query: ({ orderId, values }) => ({
        url: EXCHANGE_ROUTE + `/v1/client/order/step-4/${orderId}`,
        method: 'PUT',
        body: values,
      }),
      invalidateTags: ['Orders', 'LastOrder'],
    }),
  }),
  overrideExisting: true,
})

export const {
  useLazyGetRatesQuery,
  useGetLastOrderQuery,
  useLazyGetCouponDataQuery,
  useCheckReferralStatusQuery,
  useCreateExchangeMutation,
  useContinueExchangeMutation,
  useCancelExchangeMutation,
  useCompleteExchangeMutation,
  useGetScheduleQuery,
} = exchangeApi
