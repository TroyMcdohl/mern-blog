const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  fetching: false,
  data: null,
  err: false,
  errData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state, action) => {
      state.fetching = true;
      state.err = false;
      state.data = null;
    },
    loginSuccess: (state, action) => {
      state.fetching = false;
      state.err = false;
      state.data = action.payload;
      state.errData = null;
    },
    loginFail: (state, action) => {
      state.fetching = false;
      state.err = true;
      state.errData = action.payload;
    },
    updateStart: (state, action) => {
      state.fetching = true;
      state.err = false;
    },
    updateSuccess: (state, action) => {
      state.fetching = false;
      state.err = false;
      state.data = action.payload;
      state.errData = null;
    },
    updateFail: (state, action) => {
      state.fetching = false;
      state.err = true;
      state.errData = action.payload;
    },
    updateRefreshErr: (state, action) => {
      state.err = false;
    },
    logoutStart: (state, action) => {
      state.fetching = true;
      state.err = false;
      state.data = state.data;
    },
    logoutSuccess: (state, action) => {
      state.fetching = false;
      state.err = false;
      state.data = null;
      state.errData = null;
    },
    logoutFail: (state, action) => {
      state.fetching = false;
      state.err = true;
      state.errData = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  updateStart,
  updateSuccess,
  updateFail,
  updateRefreshErr,
  logoutStart,
  logoutSuccess,
  logoutFail,
} = authSlice.actions;
export default authSlice.reducer;
