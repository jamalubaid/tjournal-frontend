import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { ResponseCreateUser } from '../../utils/api/types';
import { RootState } from '../store';

export interface UserState {
  data?: ResponseCreateUser | null;
  visibleAuthDialog?: boolean;
  visibleMenuDialog?: boolean;
}

const initialState: UserState = {
  data: null,
  visibleAuthDialog: false,
  visibleMenuDialog: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<ResponseCreateUser>) => {
      state.data = action.payload;
    },
    setAuthVisible: (state, action) => {
      state.visibleAuthDialog = action.payload;
    },
    setMenuVisible: (state, action) => {
      state.visibleMenuDialog = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { setUserData } = userSlice.actions;
export const { setAuthVisible } = userSlice.actions;
export const { setMenuVisible } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.data;
export const selectAuthVisible = (state: RootState) =>
  state.user.visibleAuthDialog;
export const selectMenuVisible = (state: RootState) =>
  state.user.visibleMenuDialog;

export const userReducer = userSlice.reducer;
