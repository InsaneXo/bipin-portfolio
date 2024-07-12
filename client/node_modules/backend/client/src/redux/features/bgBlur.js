import { createSlice } from "@reduxjs/toolkit";

export const bgBlurSlice = createSlice({
  name: "blur",
  initialState: {},
  reducers: {
    bgBlur: (state, action) => {
      state.blur = action.payload;
    },
  },
});

export const bgBlurAction = bgBlurSlice.actions;
