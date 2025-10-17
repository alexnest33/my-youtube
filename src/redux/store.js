import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import contentSlice from "./contentSlice";
import saveInfoSlice from "./saveInfoSlice";
import viewsSlice from "./viewsSlice";

const store = configureStore({
  reducer: {
    login: authSlice,
    content: contentSlice,
    saveInfo: saveInfoSlice,
    views: viewsSlice,
  },
});

export default store;
