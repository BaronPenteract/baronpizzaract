import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SortType } from './filterSlice';
import { RootType } from '../store';

export type FetchPizza = {
  currentPage: number;
  categoryId: number;
  sortCategory: 'rating' | 'price' | 'title';
  searchValue: string;
  orderType: 'desc' | 'asc';
}

export type SearchParamsType = {
  currentPage: number;
  categoryId: number;
  sort:  'rating' | 'price' | 'title';
  searchValue: string;
  orderType: 'desc' | 'asc';
}

export const fetchPizzas = createAsyncThunk<PizzaType[], FetchPizza>(
  'pizzas/fetchPizzas',
  async ({ categoryId, sortCategory, searchValue, currentPage, orderType }, ThunkAPI) => {
    const { data } = await axios.get(
      `https://63f9ed3d473885d837d4f7e1.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId ? `category=${categoryId}&` : ''
      }sortBy=${sortCategory}${
        searchValue ? `&filter=${searchValue}&` : ''
      }&order=${orderType}`,
    );

    if (data.length > 0) {
      return data;
    } else {
      ThunkAPI.rejectWithValue('Нет таких пицц');
    }
  },
);

export type PizzaType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface PizzasInterface {
  pizzas: PizzaType[];
  status: Status
}

const initialState: PizzasInterface = {
  pizzas: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.pizzas = action.payload;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  },
});

export const getPizzasSelector = (state: RootType) => state.pizzas;
export const getPizzaByIdSelector = (id: number) => (state: RootType) =>
  state.pizzas.pizzas.find((pizza) => +pizza.id === id);

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
