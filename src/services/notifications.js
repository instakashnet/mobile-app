import { AUTH_ROUTE, baseApi } from '../api/api'

const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query({
      query: () => AUTH_ROUTE + `/v1/client/notifications`,
      transformResponse: response => response.notification,
      providesTags: ['Notifications'],
    }),
    saveNotification: builder.mutation({
      query: notification => ({
        url: AUTH_ROUTE + `/v1/client/notifications/${notification.type}`,
        method: 'PUT',
        body: notification,
      }),
      invalidatesTags: ['Notifications'],
    }),
    getRatesNotifications: builder.query({
      query: () => AUTH_ROUTE + `/v1/client/notifications/rates`,
      transformResponse: response => response.notification,
    }),
    saveRatesNotifications: builder.mutation({
      query: notificationValues => ({
        url: AUTH_ROUTE + `/v1/client/notifications/rate-notifications`,
        method: 'POST',
        body: notificationValues,
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useGetNotificationsQuery, useGetRatesNotificationsQuery, useSaveRatesNotificationsMutation, useSaveNotificationMutation } =
  notificationsApi
