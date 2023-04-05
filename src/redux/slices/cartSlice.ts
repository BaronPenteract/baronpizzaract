import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItemsFromLS } from '../../utils/getItemsFromLS';
import { RootType } from '../store';

export type CartItemType = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count: number;
}

interface CartStateInterface {
  totalPrice: number;
  items: CartItemType[],
}

const { items, totalPrice } = getItemsFromLS();

const initialState: CartStateInterface = {
  totalPrice,
  items
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
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
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = state.items.reduce((acc, item) => {
        return (acc += item.price * item.count);
      }, 0);
    },
    removeItem(state, action: PayloadAction<string>) {
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

export const getCartSelector = (state: RootType) => state.cart;

export const { addItem, removeItem, removeItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
