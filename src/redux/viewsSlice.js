import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  items: [],
};

export const getViews = createAsyncThunk(
  "youtube/statistics",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          params: {
            part: "statistics",
            id: id,
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
          },
        }
      );
      console.log(response.data);
      return response.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const viewsSlice = createSlice({
  name: "views",
  initialState,
  reducers: {},
  //   extraReducers: (builder) => {
  //     builder.addCase(getViews.fulfilled, (state, action) => {
  //       state.items = action.payload;
  //     });
  //   },
});

export default viewsSlice.reducer;
