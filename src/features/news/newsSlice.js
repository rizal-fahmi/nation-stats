import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { NYTIMES } from '../../constans/baseURL';

const NYTIMES_KEY = import.meta.env.VITE_NYTIMES_KEY;

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${NYTIMES}/articlesearch.json?q=${query}&api-key=${NYTIMES_KEY}`
      );
      return response.data.response.docs;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : 'Unknown error'
      );
    }
  }
);

export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
