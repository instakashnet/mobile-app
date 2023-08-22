import { AUTH_ROUTE, BASE_URL, EXCHANGE_ROUTE, baseApi } from '../api/api'

const userApi = baseApi?.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: () => AUTH_ROUTE + '/v1/client/users/user-data',
      transformResponse: response => response.user,
    }),
    addAddress: builder.mutation({
      query: values => ({
        url: AUTH_ROUTE + '/v1/client/users/profiles-address',
        method: 'PUT',
        body: values,
      }),
      invalidatesTags: ['Session'],
    }),
    addAdditionalInfo: builder.mutation({
      query: values => ({
        url: AUTH_ROUTE + '/v1/client/users/profiles',
        method: 'PUT',
        body: values,
      }),
      invalidatesTags: ['Session'],
    }),
    uploadPhoto: builder.mutation({
      query: formData => ({
        url: AUTH_ROUTE + '/v1/client/auth/upload-photo-verification',
        method: 'POST',
        body: formData,
        formData: true,
      }),
      // queryFn: async (args, _, extra, baseQuery) => {
      //   const tokenRes = await baseQuery(AUTH_ROUTE + '/v1/client/users/generate-token')
      //   if (tokenRes?.error) return { error: tokenRes?.error }

      //   const urlsRes = await baseQuery({
      //     url: BASE_URL + '/documents-service/v1/presigned-url/uploads',
      //     headers: { 'photo-token': tokenRes.data.accessToken },
      //   })
      //   if (urlsRes?.error) return { error: urlsRes?.error }
      //   const photoUrl = urlsRes.data.presignedFrontUrl

      //   const uploadRes = await baseQuery({
      //     url: photoUrl,
      //     method: 'PUT',
      //     body: args.photo,
      //     headers: {
      //       'Content-Type': 'image/jpeg',
      //     },
      //   })

      //   if (uploadRes.error) return { error: uploadRes.error }

      //   return { data: 'photo uploaded successfully' }
      // },
    }),
    withdrawKash: builder.mutation({
      query: values => ({
        url: EXCHANGE_ROUTE + '/v1/client/withdrawals/user',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: (result, error, arg) => (result ? [{ type: 'Withdrawals', id: arg.id }, 'UserKash'] : []),
    }),
  }),
  overrideExisting: true,
})

export const { useAddAddressMutation, useAddAdditionalInfoMutation, useWithdrawKashMutation, useUploadPhotoMutation, useLazyGetUserQuery } =
  userApi
