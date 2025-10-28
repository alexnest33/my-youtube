import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: "",
  password: "",
};

export const login = createAsyncThunk("youtube/login", async (values) => {
  try {
    const response = await axios.post(
      "https://todo-redev.herokuapp.com/api/auth/login",
      { email: values.email, password: values.password }
    );
    localStorage.setItem("token", response.data.token);
    return response.data.token;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
