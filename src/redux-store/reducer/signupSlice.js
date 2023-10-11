import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  fetching: false,
  err: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupStart: (state, action) => {
      state.fetching = true;
    },
    signupSuccess: (state, action) => {
      state.fetching = false;
      state.data = action.payload;
    },
    signupFail: (state, action) => {
      state.err = true;
      state.data = null;
    },
  },
});

export const { signupStart, signupSuccess, signupFail } = signupSlice.actions;
export default signupSlice.reducer;
