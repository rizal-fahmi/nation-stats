import { configureStore } from '@reduxjs/toolkit';
import countriesSlice from '../features/country/countrySlice';
import newsSlice from '../features/news/newsSlice';

const store = configureStore({
  reducer: {
    countries: countriesSlice,
    news: newsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
