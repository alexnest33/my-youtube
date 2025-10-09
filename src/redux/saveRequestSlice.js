import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedRequests: [],
};

export const saveRequestSlice = createSlice({
  name: "saveInfo",
  initialState,
  reducers: {
    addSaveRequest(state, action) {
      state.savedRequests.push(action.payload);
      localStorage.setItem("saveInfo", JSON.stringify(state.savedRequests));
    },
  },
});

export const { addSaveRequest } = saveRequestSlice.actions;
export default saveRequestSlice.reducer;
