import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import cartSlice from './slices/cartSlice';
import usersSlice from './slices/userSlice';
const store = configureStore({
	reducer: {
		products: productsSlice,
		cart: cartSlice,
		users: usersSlice,
	},
});

export default store;
