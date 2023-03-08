import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setOrderType(state, action) {
      state.order = action.payload;
      state.orderType = state.order ? 'desc' : 'asc';
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.orderType = action.payload.orderType;
      state.order = action.payload.orderType === 'desc' ? true : false;
    },
  },
});

export const { setCategoryId, setSortType, setOrderType, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
