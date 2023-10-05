import { formatAccounts } from '@/helpers/formatters'
import { baseApi, ACCOUNT_ROUTE } from '../api/api'

export const accountApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getBanks: builder.query({
      query: () => ACCOUNT_ROUTE + '/v1/client/banks/172',
      transformResponse: response => response.banks,
    }),
    getCurrencies: builder.query({
      query: () => ACCOUNT_ROUTE + '/v1/client/currencies/country/172',
      transformResponse: response => response.currencies,
    }),
    getAccounts: builder.query({
      query: type => ACCOUNT_ROUTE + `/v1/client/accounts?type=${type}`,
      transformResponse: response => {
        const personalAccounts = formatAccounts(response.personalAccounts)
        const thirdAccounts = formatAccounts(response.thirdAccounts)

        return { personal: personalAccounts, tercero: thirdAccounts }
      },
      providesTags: ['Accounts'],
    }),
    addAccount: builder.mutation({
      query: values => ({
        url: ACCOUNT_ROUTE + '/v1/client/accounts',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Accounts'],
    }),
    editAccount: builder.mutation({
      query: ({ values, id }) => ({
        url: ACCOUNT_ROUTE + `/v1/client/accounts/${id}`,
        method: 'PUT',
        body: values,
      }),
      invalidatesTags: (result, error, arg) => (result ? [{ type: 'Accounts', id: arg.id }] : []),
    }),
    deleteAccount: builder.mutation({
      query: id => ({
        url: ACCOUNT_ROUTE + `/v1/client/accounts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => (result ? [{ type: 'Accounts', id: arg.id }] : []),
    }),
  }),
  overrideExisting: true,
})

export const {
  useLazyGetBanksQuery,
  useLazyGetCurrenciesQuery,
  useGetAccountsQuery,
  useAddAccountMutation,
  useEditAccountMutation,
  useDeleteAccountMutation,
} = accountApi
