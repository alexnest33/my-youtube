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
    changeRequest(state, action) {
      state.active = { ...state.active, ...action.payload }
    },
  },
});

export const { saving, changeRequest,  } = saveInfoSlice.actions;
export default saveInfoSlice.reducer;
