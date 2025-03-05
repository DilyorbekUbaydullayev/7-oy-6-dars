import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setToCart: (state, action) => {
            state.cart = action.payload;
        },
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
    },
})

export const { addToCart, removeFromCart,setToCart } = cartSlice.actions;

export default cartSlice.reducer;