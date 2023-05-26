import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

const initialState = {
  alerts: []
}

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    showAlert: (state, { payload: { message, type } }) => {
      const alertId = nanoid()
      state.alerts.push({ id: alertId, visible: true, message, type })
    },
    clearAlert: (state, { payload: id }) => {
      return { alerts: state.alerts.filter((alert) => alert.id !== id) }
    }
  }
})

export const { showAlert, clearAlert } = alertSlice.actions

// SELECTORS
export const selectAlerts = (state) => state.notifications.alerts

export default alertSlice.reducer
