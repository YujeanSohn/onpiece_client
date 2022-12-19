import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [
    {
      postId: 1,
      userId: 1,
      nickname: "",
      title: "",
      content: "",
      category: [],
      level: "",
      headCount: 1,
      recruitmentEndDay: 1671425197822,
      startTime: "13:00:00",
      endTime: "14:00:00",
      startDay: "2021-02-21",
      endDay: "2021-02-21",
      applicants: [],
    },
  ],
  post: {
    postId: 1,
    userId: 1,
    nickname: "",
    userDescription: "",
    exPosts: [""],
    title: "",
    content: "",
    category: [],
    level: "",
    headCount: 1,
    recruitmentEndDay: 1671425197822,
    startTime: "13:00:00",
    endTime: "14:00:00",
    startDay: "2021-02-21",
    endDay: "2021-02-21",
    applicants: [{ userId: 1, nickname: "", description: "" }],
  },
  isLoading: false,
};

export const __post = createAsyncThunk("post", async (payload, thunkAPI) => {
  try {
    //const { data } = await axios.post(`api/posts`, payload);
    console.log(payload);
    //return thunkAPI.fulfillWithValue(data.data);
  } catch (e) {
    alert(`postsError: ${e}`);
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(__post.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__post.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      });
  },
});

export default postsSlice.reducer;
