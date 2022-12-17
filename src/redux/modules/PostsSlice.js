import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      userId: 1,
      nickname: "",
      title: "",
      content: "",
      category: [],
      level: "",
      headCount: 1,
      recruitmentEndDay: 1671178923,
      studyStartTime: "13:00:00",
      studyEndTime: "14:00:00",
      studyStartDay: "2021-02-21",
      studyEndDay: "2021-02-21",
      applicants: [],
    },
  ],
  post: {
    userId: 1,
    nickname: "",
    userDescription: "",
    userPosts: [""],
    title: "",
    content: "",
    category: [],
    level: "",
    headCount: 1,
    recruitmentEndDay: 1671178923,
    studyStartTime: "13:00:00",
    studyEndTime: "14:00:00",
    studyStartDay: "2021-02-21",
    studyEndDay: "2021-02-21",
    applicants: [],
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
