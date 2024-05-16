import { createSlice } from "@reduxjs/toolkit";
import { fetchUserArticleData } from "./userArticle";

const initialState = {
    userArticleData: null,
    newPostFlag: false,
  };
  
  const artSlice = createSlice({
    name: 'art',
    initialState,
    reducers: {
      setNewPostFlag: (state, action) => {
        state.newPostFlag = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchUserArticleData.fulfilled, (state, action) => {
        state.userArticleData = action.payload;
        state.newPostFlag = false;
      });
    },
  });
  
  export const { setNewPostFlag } = artSlice.actions;
  export default artSlice.reducer;
  