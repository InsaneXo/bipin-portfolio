import { configureStore } from "@reduxjs/toolkit";
import { bgBlurSlice } from "./features/bgBlur";
import { messageSlice, projectSlice, userSlice } from "./features/userSlice";

const store = configureStore({
  reducer: {
    bgBlur: bgBlurSlice.reducer,
    user: userSlice.reducer,
    project: projectSlice.reducer,
    message: messageSlice.reducer,
  },
});

export default store;
