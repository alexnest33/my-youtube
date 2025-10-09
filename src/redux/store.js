import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import contentSlice from "./contentSlice";

const store = configureStore({
  reducer: {
    login: authSlice,
    content: contentSlice,
  },
});

export default store;
