// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import productslice from './slices/productSlice'
import cartSlice from './slices/cartSlice'
export const store = configureStore({
  reducer: {
        auth: authReducer,
      product: productslice,
      cart: cartSlice,
  },
  
});
