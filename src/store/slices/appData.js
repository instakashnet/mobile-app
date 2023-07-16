import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  banks: [],
  currencies: [],
  schedule: null,
}

const appDataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    setCurrencies: (state, { payload }) => ({ ...state, currencies: payload }),
    setBanks: (state, { payload }) => ({ ...state, banks: payload }),
    setSchedule: (state, { payload }) => ({ ...state, schedule: payload }),
  },
})

export const { setBanks, setCurrencies, setSchedule } = appDataSlice.actions

export const selectCurrencies = state => state.appData.currencies
export const selectBanks = state => state.appData.banks
export const selectSchedule = state => state.appData.schedule

export default appDataSlice.reducer
