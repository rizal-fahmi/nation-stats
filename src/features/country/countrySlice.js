import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RESTCOUNTRIES } from '../../constans/baseURL';

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // waktu kadaluarsa cache 1 minggu

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (_, { rejectWithValue }) => {
    try {
      // cek apakah data ada di cache
      const cachedData = localStorage.getItem('countries'); // cache data
      const cachedTime = localStorage.getItem('countriesTime'); // cache time
      if (
        cachedData &&
        cachedTime &&
        Date.now() - Number(cachedTime) < ONE_WEEK
      ) {
        return JSON.parse(cachedData); // jika ada dan masih berlaku, baca cache
      }

      const { data } = await axios.get(`${RESTCOUNTRIES}/all`); // jika tidak ada atau kadaluarsa, fetch data
      localStorage.setItem('countries', JSON.stringify(data)); // simpan ke cache 
      localStorage.setItem('countriesTime', Date.now().toString()); // simpan time cache
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Unknown error');
    }
  }
);

const countrySlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectCountries = (state) => state.countries.countries;
export default countrySlice.reducer;
