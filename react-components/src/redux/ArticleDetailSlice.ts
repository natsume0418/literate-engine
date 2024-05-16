import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 非同期のfetchUserInfo actionを定義
export const fetchArticleDetailData = createAsyncThunk('user/fetchArticleDetailData', async (id: string, thunkAPI) => {
  const response = await axios.get(`/article`);
  return response.data.articleData;
});

interface ArticleDetailData{
  id: number;
  title: string;
  content: string;
};

// userSliceを作成
const ArticleDetailSlice = createSlice({
  name: 'articleDetail',
  initialState: [] as ArticleDetailData[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticleDetailData.fulfilled, (state, action) => {
      state.push(...action.payload)
    });
  },
});

// userReducerをエクスポート
export default ArticleDetailSlice.reducer;