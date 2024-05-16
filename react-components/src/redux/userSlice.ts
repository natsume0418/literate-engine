import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// 非同期のfetchUserInfo actionを定義
export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  const response = await axios.get('/user_id');
  return response.data.userData;
});

interface UserData  {
  mailAddress: string;
  userIconImage: string;
  nickName?: string | null;
};

// userSliceを作成
const userSlice = createSlice({
  name: 'user',
  initialState: { mailAddress: '', userIconImage: '', nickName: null } as UserData,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      return action.payload;
    },
    setNickName: (state, action: PayloadAction<string|null>) => {
      state.nickName = action.payload;
    },
    setMailAddress: (state, action: PayloadAction<string>) => {
      state.mailAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
      return action.payload;
    });
  },
});

// userReducerをエクスポート
export const { setUserData, setNickName,setMailAddress } = userSlice.actions;
export default userSlice.reducer;