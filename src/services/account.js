import { baseApi, ACCOUNT_ROUTE } from '../api/api'

export const accountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanks: builder.query({
      query: () => ACCOUNT_ROUTE + '/v1/client/banks/172',
      transformResponse: (response) => response.banks
    }),
    getCurrencies: builder.query({
      query: () => ACCOUNT_ROUTE + '/v1/client/currencies/country/172',
      transformResponse: (response) => response.currencies
    }),
    getAccounts: builder.query({
      query: (type) => ACCOUNT_ROUTE + `/v1/client/accounts?type=${type}`,
      transformResponse: (response) => {
        const formattedBanks = response.accounts?.map((account) => ({
          id: account.id,
          accNumber: account.account_number,
          cci: account.cci,
          bank: {
            name: account.bank?.name,
            isDirect: account.bank?.active,
            id: account.bank?.id
          },
          accType: account.acc_type === 'savings' ? 'ahorros' : 'corriente',
          currency: {
            symbol: account.currency?.Symbol,
            name: account.currency?.name,
            id: account.currency?.id
          },
          alias: account.alias,
          joint: account.joint,
          jointValues: account.thirdParty
        }))

        return formattedBanks
      },
      providesTags: (result, error, arg) => (result ? [...result.map(({ id }) => ({ type: 'Accounts', id })), 'Accounts'] : ['Accounts'])
    }),
    addAccount: builder.mutation({
      query: (values) => ({
        url: ACCOUNT_ROUTE + '/v1/client/accounts',
        method: 'POST',
        body: values
      }),
      invalidatesTags: ['Accounts']
    }),
    editAccount: builder.mutation({
      query: ({ values, id }) => ({
        url: ACCOUNT_ROUTE + `/v1/client/accounts/${id}`,
        method: 'PUT',
        body: values
      }),
      invalidatesTags: (result, error, arg) => (result ? [{ type: 'Accounts', id: arg.id }] : [])
    }),
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: ACCOUNT_ROUTE + `/v1/client/accounts/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, arg) => (result ? [{ type: 'Accounts', id: arg.id }] : [])
    })
  }),
  overrideExisting: true
})

export const {
  useLazyGetBanksQuery,
  useLazyGetCurrenciesQuery,
  useGetAccountsQuery,
  useAddAccountMutation,
  useEditAccountMutation,
  useDeleteAccountMutation
} = accountApi
