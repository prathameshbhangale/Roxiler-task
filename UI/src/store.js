import { configureStore } from '@reduxjs/toolkit';
import filterOptionsReducer from './slice/filterOption.js'

export const store = configureStore({
  reducer: {
    filterOptions: filterOptionsReducer
  }
});
