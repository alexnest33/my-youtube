import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";

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
      localStorage.setItem("token", response.data.token);
      message.success("Успешный вход!");
      return response.data.token;
    } catch (error) {
      message.error("Ошибка входа. Проверьте email и пароль");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
