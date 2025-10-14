import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
};

export const getVideos = createAsyncThunk(
  "youtube/getvideos",
  async ({ text, maxResults  }, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: text,
            maxResults: maxResults,
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("blbal");
    }
  }
);

const contentSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVideos.pending, (state, action) => {
        console.log(action);
      })
      .addCase(getVideos.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(getVideos.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export default contentSlice.reducer;
