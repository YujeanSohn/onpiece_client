import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";

export const __addPost = createAsyncThunk(
  "addPost",
  async (payload, thunkAPI) => {
    try {
      const { data } = await client.post(`/posts`, payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      alert(`addPostError: ${e}`);
    }
  }
);

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

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(__addPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__addPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = [...state.posts, action.payload];
      });
  },
});

export default postsSlice.reducer;
