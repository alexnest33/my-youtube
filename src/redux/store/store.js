import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import contentSlice from "../slices/contentSlice";
import saveInfoSlice from "../slices/saveInfoSlice";

const store = configureStore({
  reducer: {
    login: authSlice,
    content: contentSlice,
    saveInfo: saveInfoSlice,
  },
});

export default store;
