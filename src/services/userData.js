import { AUTH_ROUTE, baseApi, EXCHANGE_ROUTE } from '../api/api'
import { setUser } from '../store/slices/authSlice'

const userDataApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserProfiles: builder.query({
      query: () => AUTH_ROUTE + '/v1/client/users/profiles',
      transformResponse: result => {
        const personal = result.profiles.find(profile => profile.type === 'natural') || {}
        const companies = result.profiles.filter(profile => profile.type !== 'natural')
        const favorite = companies.find(company => company.isFavorite)

        return { personal, companies, favorite }
      },
      providesTags: ['Profiles'],
    }),
    addProfile: builder.mutation({
      query: values => ({
        url: AUTH_ROUTE + '/v1/client/users/profiles',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Profiles'],
    }),
    removeProfile: builder.mutation({
      query: profileId => ({
        url: AUTH_ROUTE + `/v1/client/users/active/${profileId}`,
        body: { active: false },
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => (result ? [{ type: 'Profiles', id: arg.id }] : []),
    }),
    toggleFavProfile: builder.mutation({
      query: ({ values, profileId }) => ({
        url: AUTH_ROUTE + `/v1/client/users/profiles/change-favorite/${profileId}`,
        method: 'PUT',
        body: values,
      }),
      invalidatesTags: (result, error, arg) => (result ? [{ type: 'Profiles', id: arg.id }] : []),
    }),
    getUserLevel: builder.query({
      query: () => AUTH_ROUTE + '/v1/client/users/current-level',
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const user = getState().auth.user
          dispatch(setUser({ ...user, level: data.levelName }))
        } catch (error) {
          console.log(error)
        }
      },
      providesTags: ['UserLevel'],
      keepUnusedDataFor: 0.001,
    }),
    getUserExchangeData: builder.query({
      query: () => EXCHANGE_ROUTE + '/v1/client/order/data/total-orders/user',
      providesTags: ['UserExchangeData'],
    }),
    getUserOrders: builder.query({
      query: values => {
        const URL = `/v1/client/order/user?from=${values.from}&limit=${values.limit}`
        return EXCHANGE_ROUTE + URL
      },
      transformResponse: response => {
        return response.ordersByUser
      },
      providesTags: ['Orders'],
      keepUnusedDataFor: 5,
    }),
    getUserWithdrawals: builder.query({
      query: limit => EXCHANGE_ROUTE + `/v1/client/withdrawals/user?limit=${limit}`,
      providesTags: ['Withdrawals'],
    }),
    getUserKash: builder.query({
      query: (affiliates = false) => {
        let URL = '/v1/client/users/kash-data'
        if (affiliates) URL += '?showAffiliates=' + affiliates

        return AUTH_ROUTE + URL
      },
      keepUnusedDataFor: 50,
      providesTags: ['UserKash'],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetUserLevelQuery,
  useLazyGetUserOrdersQuery,
  useLazyGetUserWithdrawalsQuery,
  useGetUserKashQuery,
  useGetUserProfilesQuery,
  useAddProfileMutation,
  useToggleFavProfileMutation,
  useGetUserExchangeDataQuery,
  useRemoveProfileMutation,
} = userDataApi
