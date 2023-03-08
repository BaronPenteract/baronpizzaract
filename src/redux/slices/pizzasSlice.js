import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async ({ categoryId, sortType, searchValue, currentPage, orderType }) => {
    const res = await axios.get(
      `https://63f9ed3d473885d837d4f7e1.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId ? `category=${categoryId}&` : ''
      }sortBy=${sortType.sortCategory}${
        searchValue ? `&filter=${searchValue}&` : ''
      }&order=${orderType}`,
    );

    return res.data;
  },
);

const initialState = {
  pizzas: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.pizzas = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'success';
      state.pizzas = action.payload;
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.pizzas = [];
    },
  },
});

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
