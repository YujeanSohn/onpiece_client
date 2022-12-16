import { configureStore } from "@reduxjs/toolkit";

import posts from "../modules/PostsSlice";

const store = configureStore({
  reducer: { posts: posts },
});

export default store;
