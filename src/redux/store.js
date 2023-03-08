import { configureStore } from '@reduxjs/toolkit';

import filterReduser from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import pizzasSlice from './slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filter: filterReduser,
    cart: cartSlice,
    pizzas: pizzasSlice,
  },
});
