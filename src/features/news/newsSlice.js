import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { NYTIMES } from '../../constans/baseURL';

const NYTIMES_KEY = import.meta.env.VITE_NYTIMES_KEY;

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
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

export const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default articleSlice.reducer;
