import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";

const url = import.meta.env.VITE_YOUTUBE_QUERY;

const initialState = {
  items: [],
};

export const getVideos = createAsyncThunk(
  "youtube/getvideos",
  async ({ name, maxResults }) => {
    try {
      const response = await axios.get(`${url}/search`, {
        params: {
          part: "snippet",
          q: name,
          maxResults: maxResults,
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      message.error("Видео недоступны по причине сервера");
    }
  }
);

const contentSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVideos.fulfilled, (state, action) => {
      state.items = action.payload?.items || [] ;
    });
  },
});

export default contentSlice.reducer;
