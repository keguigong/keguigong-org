import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './store'

// ## CartState Interface
export interface State {
  isHome: boolean
  isBlogBody: boolean
  primaryTitle: string
  secondaryTitle: string
  routeChangeStart: boolean
}

// ## Define the initial state of Cart State
const initialState: State = {
  isHome: true,
  isBlogBody: false,
  primaryTitle: '',
  secondaryTitle: '',
  routeChangeStart: false
}

export const slice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setIsHome(state, action) {
      state.isHome = action.payload
    },
    setIsBlogBody(state, action) {
      state.isBlogBody = action.payload
    },
    setSecondaryTitle(state, action) {
      state.secondaryTitle = action.payload
    },
    setRouteChangeStart(state, action) {
      state.routeChangeStart = action.payload
    }
  }
})

export const { setIsHome, setIsBlogBody, setSecondaryTitle, setRouteChangeStart } = slice.actions

export const getIsHome = (state: AppState) => state.header.isHome
export const getIsBlogBody = (state: AppState) => state.header.isBlogBody
export const getSecondaryTitle = (state: AppState) => state.header.secondaryTitle
export const getRouteChangeStart = (state: AppState) => state.header.routeChangeStart

export default slice.reducer
