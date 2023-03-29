import { createSlice } from "@reduxjs/toolkit";

type loaderType = {
  loader: {
    isLoading: boolean;
  };
};

const initialState: loaderType = {
  loader: {
    isLoading: false,
  },
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState: initialState,
  reducers: {
    updateLoadingStatus: (state, action: { payload: boolean }) => {
      state.loader.isLoading = action.payload;
    },
  },
});

export const loaderActions = loaderSlice.actions;

export const loaderReducer = loaderSlice.reducer;
