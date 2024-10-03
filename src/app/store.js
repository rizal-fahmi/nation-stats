import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    countries: countriesSlice,
		news: newsSlice,
  },
});