import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RESTCOUNTRIES } from '../../constans/baseURL';

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${RESTCOUNTRIES}/all`);
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

export default countrySlice.reducer;
