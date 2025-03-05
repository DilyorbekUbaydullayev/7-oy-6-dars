import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	products: null,
	isLoading: false,
	error: null,
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, action) => {
			state.products = action.payload;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const { setProducts, setError, setIsLoading } = productsSlice.actions;
export default productsSlice.reducer;
