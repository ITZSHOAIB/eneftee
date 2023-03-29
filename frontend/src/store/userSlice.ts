import { createSlice } from "@reduxjs/toolkit";

type userType = {
  user: {
    name: string;
    address?: string;
    isRegistered: boolean;
    tokenBalance: number;
  };
};

const initialState: userType = {
  user: {
    isRegistered: false,
    name: "",
    tokenBalance: 0,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateAddress: (state, action: { payload: string }) => {
      state.user.address = action.payload;
    },
    updateIsRegistered: (state, action: { payload: boolean }) => {
      state.user.isRegistered = action.payload;
    },
    updateName: (state, action: { payload: string }) => {
      state.user.name = action.payload;
    },
    addBalance: (state, action: { payload: number }) => {
      state.user.tokenBalance += action.payload;
    },
    updateBalance: (state, action: { payload: number }) => {
      state.user.tokenBalance = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
