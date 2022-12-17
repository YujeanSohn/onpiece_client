import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      userId: 1,
      nickname: "재민",
      title: "노드",
      content: "노드",
      category: ["노드"],
      level: "초급",
      headCount: 1,
      recruitmentEndDay: 1671178923,
      studyStartTime: "13:00:00",
      studyEndTime: "14:00:00",
      studyStartDay: "2021-02-21",
      studyEndDay: "2021-02-21",
      applicants: ["유진"],
    },
  ],
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
