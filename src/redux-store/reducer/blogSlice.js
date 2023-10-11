import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    blogSuccess: (state, action) => {
      state.data = action.payload;
    },
    blogLike: (state, action) => {
      state.data = action.payload;
    },

    blogUnLike: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { blogSuccess, blogLike, blogUnLike } = blogSlice.actions;
export default blogSlice.reducer;
