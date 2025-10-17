import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import contentSlice from "./contentSlice";
import saveInfoSlice from "./saveInfoSlice";

const store = configureStore({
  reducer: {
    login: authSlice,
    content: contentSlice,
    saveInfo: saveInfoSlice,
  },
});

export default store;
