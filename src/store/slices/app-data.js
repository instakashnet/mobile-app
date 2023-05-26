import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  banks: [],
  currencies: []
}

const appDataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    setCurrencies: (state, { payload }) => ({ ...state, currencies: payload }),
    setBanks: (state, { payload }) => ({ ...state, banks: payload })
  }
})

export const { setBanks, setCurrencies } = appDataSlice.actions

export const selectCurrencies = (state) => state.appData.currencies
export const selectBanks = (state) => state.appData.banks

export default appDataSlice.reducer
