import { createSlice } from '@reduxjs/toolkit';

interface DetailState {
  content: string;
}

const initialState: DetailState = {
  content: '',
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    setArticleContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { setArticleContent } = detailSlice.actions;
export default detailSlice.reducer;