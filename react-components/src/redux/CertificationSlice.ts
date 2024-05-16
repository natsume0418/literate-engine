import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export const certificationSlice = createSlice({
  name: 'certification',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login: state => {
      state.isLoggedIn = true;
    },
    logout: state => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = certificationSlice.actions;
export const selectIsLoggedIn = (state: RootState) => state.certification.isLoggedIn;
export default certificationSlice.reducer;