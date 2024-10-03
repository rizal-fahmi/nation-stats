import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RESTCOUNTRIES } from '../../constans/baseURL';

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${RESTCOUNTRIES}/all`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : 'Unknown error'
      );
    }
  }
);

export const countrySlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    loading: false,
    error: null,
  },
  reducers: {},
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
