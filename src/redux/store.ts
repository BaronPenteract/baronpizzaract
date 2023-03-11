import { configureStore } from '@reduxjs/toolkit';

import filterReduser from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import pizzasSlice from './slices/pizzasSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filterReduser,
    cart: cartSlice,
    pizzas: pizzasSlice,
  },
});


export type RootType = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();