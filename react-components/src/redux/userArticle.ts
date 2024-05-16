import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 非同期のfetchUserInfo actionを定義
export const fetchUserArticleData = createAsyncThunk('user/fetchUserArticleData', async () => {

  const response = await axios.get('/article');
  return response.data.articleData;
});

interface ArticleData {
  id: number;
  title: string;
  content: string;
};

// userSliceを作成
const userArticleSlice = createSlice({
  name: 'userArticle',
  initialState: [] as ArticleData[],
  reducers: {
    setUserArticles: (state, action) => {
      return action.payload; // 記事データを受け取って状態を更新
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserArticleData.fulfilled, (state, action) => {
      state.push(...action.payload)
    });
  },
});


export const { setUserArticles } = userArticleSlice.actions;

// userReducerをエクスポート
export default userArticleSlice.reducer;