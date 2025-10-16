import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: {
    name: "",
    sorted: "",
    maxResults: 15,
    title: "",
  },
};

export const saveInfoSlice = createSlice({
  name: "saving",
  initialState,
  reducers: {
    saving(state, action) {
      state.active = action.payload;
     
    },
    deleteItem(state, action) {
      state.active = state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { saving } = saveInfoSlice.actions;
export default saveInfoSlice.reducer;
