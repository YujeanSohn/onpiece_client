import { createSlice } from "@reduxjs/toolkit";

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
  reducers: {
    getPosts: (state, payload) => {
      console.log(state.posts, payload);
    },
  },
});

export default postsSlice.reducer;
