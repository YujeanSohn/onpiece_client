import { configureStore } from "@reduxjs/toolkit";

import posts from "../modules/PostsSlice";
import user from "../modules/UserSlice";

const store = configureStore({
  reducer: { posts: posts, user: user },
});

export default store;
