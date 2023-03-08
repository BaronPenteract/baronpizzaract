import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce((acc, item) => {
        return (acc += item.price * item.count);
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = state.items.reduce((acc, item) => {
        return (acc += item.price);
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce((acc, item) => {
        return (acc += item.price);
      }, 0);
    },
    removeItems(state) {
      state.totalPrice = 0;
      state.items = [];
    },
  },
});

export const { addItem, removeItem, removeItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
