import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./reducer/signupSlice";

export const otherStore = configureStore({
  reducer: {
    signup: signupReducer,
  },
});
