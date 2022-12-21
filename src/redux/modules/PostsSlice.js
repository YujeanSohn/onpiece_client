import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import client, { nonTokenClient } from "../../api/client";

export const __getPostsStatics = createAsyncThunk(
  "getPostsStatics",
  async (payload, thunkAPI) => {
    try {
      const { data } = await nonTokenClient.get(`/posts/statics`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      alert(`getPostsStaticsError: ${e}`);
    }
  }
);

export const __getPosts = createAsyncThunk(
  "getPosts",
  async (payload, thunkAPI) => {
    try {
      const { data } = await client.get(`/posts`);
      return thunkAPI.fulfillWithValue(data.allPost);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const __addPost = createAsyncThunk(
  "addPost",
  async (payload, thunkAPI) => {
    try {
      await client.post(`/posts`, payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      alert(`addPostError: ${e}`);
    }
  }
);

const initialState = {
  totalPostsCount: 0,
  completedPostsCount: 0,
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
      .addCase(__getPostsStatics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getPostsStatics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalPostsCount = action.payload.totalPostsCount;
        state.completedPostsCount = action.payload.completedPostsCount;
        state.posts = action.payload.posts;
      })
      .addCase(__getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(__getPosts.rejected, (state, action) => {
        alert(action.payload);
      })
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
