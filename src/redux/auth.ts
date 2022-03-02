import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import Reader from '../models/reader';

// Define a type for the slice state
interface AuthState {
  loginUser: Reader;
}

// Define the initial state using that type
const initialState: AuthState = {
  loginUser: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Reader>) => {
      console.log("boom");
      
      state.loginUser = action.payload;
    },
    logOut: (state) => {
      state.loginUser = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logOut, login } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const logged = (state: RootState) => state.auth.loginUser;

export default authSlice.reducer;
