import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    page: 1,
    perPage: 10,
    month: 3,
    total:0,
    title: '',      
    description: '', 
    price: 0,      
    loading: false,
    error: null
};

const filterOptions = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
    nextPage: (state) => {
        // const maxPage = Math.ceil(state.total / state.perPage);
        // if (state.page < maxPage) {
          state.page += 1; 
        // }
    },
    previousPage: (state) => {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
    setMonth: (state, action) => {
      state.month = action.payload;
    },
    setTotal: (state, action) => {
        state.total = action.payload;
      },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetFilters: () => {
      return initialState;
    }
  }
});

export const { 
  setPage, 
  setPerPage, 
  nextPage, 
  previousPage, 
  setMonth, 
  setTitle, 
  setDescription, 
  setPrice, 
  setLoading, 
  setError, 
  resetFilters 
} = filterOptions.actions;

export default filterOptions.reducer;
