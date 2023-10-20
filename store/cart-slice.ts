import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "./store";

// ## CartState Interface
export interface CartState {
  itemsInCart: number
  totalAmount: number
}

// ## Define the initial state of Cart State
const initialState: CartState = {
  itemsInCart: 0,
  totalAmount: 0
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItemsInCart(state, action) {
      state.itemsInCart = action.payload
    },
    setTotalAmount(state, action) {
      state.totalAmount = action.payload
    }
  }
})

export const { setItemsInCart, setTotalAmount } = cartSlice.actions

export const getItemsInCart = (state: AppState) => state.cart.itemsInCart;
export const getTotalAmount = (state: AppState) => state.cart.totalAmount;

export default cartSlice.reducer
