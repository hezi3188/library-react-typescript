import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';
import Reader from '../models/reader';
import Book from '../models/book';
// Define a type for the slice state
interface AuthState {
  loginUser: Reader;
  favoriteBook: Book;
}

// Define the initial state using that type
const initialState: AuthState = {
  loginUser: undefined,
  favoriteBook: undefined,
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
      state.favoriteBook = undefined;
    },
    selectFavorite: (state, action: PayloadAction<Book | undefined>) => {
      console.log('boom');

      state.favoriteBook = action.payload;
      let copyState = state.loginUser;
      if (copyState) {
        state.loginUser = {
          lastName: copyState?.lastName,
          firstName: copyState?.firstName,
          id: copyState?.id,
          favoriteBook: action.payload?.id,
        };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { logOut, login, selectFavorite } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const logged = (state: RootState) => state.auth.loginUser;

export default authSlice.reducer;
