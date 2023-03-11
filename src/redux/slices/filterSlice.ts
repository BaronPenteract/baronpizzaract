import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootType } from '../store';

export type SortType = {
  name: string,
  sortCategory: 'rating' | 'price' | 'title',
}

export interface FilterInterface {
  searchValue: string;
  categoryId: number;
  sortType: SortType;
  orderType: 'desc' | 'asc';
  order?: boolean;
  currentPage: number;
}

const initialState: FilterInterface = {
  searchValue: '',
  categoryId: 0,
  sortType: {
    name: 'популярности',
    sortCategory: 'rating',
  },
  orderType: 'desc',
  order: true,
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
    setOrderType(state, action: PayloadAction<boolean>) {
      state.order = action.payload;
      state.orderType = state.order ? 'desc' : 'asc';
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterInterface>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = action.payload.sortType;
      state.currentPage = Number(action.payload.currentPage);
      state.orderType = action.payload.orderType;
      state.order = action.payload.orderType === 'desc' ? true : false;
    },
  },
});

export const getFilterSelector = (state: RootType) => state.filter;

export const {
  setCategoryId,
  setSortType,
  setOrderType,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
