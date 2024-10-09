import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { NYTIMES } from '../../constans/baseURL';

const NYTIMES_KEY = import.meta.env.VITE_NYTIMES_KEY;
const CACHE_KEY = 'newsCache';
const ONE_HOUR = 60 * 60 * 1000; // waktu kadaluarsa cache 1 jam

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ query, page }, { rejectWithValue }) => {
    try {
      // cek apakah data ada di cache
      const cacheData = localStorage.getItem(CACHE_KEY); // cache data
      const cacheTime = localStorage.getItem(`${CACHE_KEY}Time`); // cache time
      if (cacheData && cacheTime && Date.now() - Number(cacheTime) < ONE_HOUR) { // cek apakah cache ada dan masih berlaku
        const cachedNews = JSON.parse(cacheData); // jika ada dan masih berlaku maka baca cache
        return cachedNews.filter((article) => article.query === query); // filter berdasarkan query
      }

      // jika tidak ada atau kadaluarsa
      const response = await axios.get(
        `${NYTIMES}/articlesearch.json?q=${query}&page=${page}&api-key=${NYTIMES_KEY}` // fetch data
      );
      const articles = response.data.response.docs.map((article) => ({ 
        ...article, // ambil semua data
        query, // tambahkan query
      }));
      localStorage.setItem(CACHE_KEY, JSON.stringify(articles)); // simpan ke cache
      localStorage.setItem(`${CACHE_KEY}Time`, Date.now().toString()); // simpan time cache
      return articles;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message || 'Unknown error' 
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
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },
  },
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

export const { setNews } = newsSlice.actions;
export default newsSlice.reducer;
