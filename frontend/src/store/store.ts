import { configureStore } from "@reduxjs/toolkit";
import { assetsReducer } from "./assetsSlice";
import { loaderReducer } from "./loaderSlice";
import { userReducer } from "./userSlice";

export const store = configureStore({
  reducer: {
    userSlice: userReducer,
    assetsSlice: assetsReducer,
    loaderSlice: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
