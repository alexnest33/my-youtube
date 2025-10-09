import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: "",
  password: "",
};

export const login = createAsyncThunk(
  "youtube/login",
  async (values, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://todo-redev.herokuapp.com/api/auth/login",
        { email: values.email, password: values.password }
      );
      console.log("Данные получены", response.data);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        console.log(action);
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export const { writeInfo } = authSlice.actions;
export default authSlice.reducer;
