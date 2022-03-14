import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';
import Reader from '../models/reader';

interface AuthState {
  loginUser: Reader;
}

const initialState: AuthState = {
  loginUser: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Reader>) => {
      state.loginUser = action.payload;
    },
    logOut: (state) => {
      state.loginUser = undefined;
    },
    editReader: (state, action: PayloadAction<Reader | undefined>) => {
      state.loginUser = action.payload;
    },
  },
});

export const { logOut, login, editReader } = authSlice.actions;

export const logged = (state: RootState) => state.auth.loginUser;

export default authSlice.reducer;
