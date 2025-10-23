import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
};

export const getVideos = createAsyncThunk(
  "youtube/getvideos",
  async ({ name, maxResults }, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: name,
            maxResults: maxResults,
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Ошибка отправки запроса");
    }
  }
);

const contentSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVideos.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
  },
});

export default contentSlice.reducer;
