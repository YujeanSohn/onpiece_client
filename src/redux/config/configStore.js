import { configureStore } from "@reduxjs/toolkit";

import user from "../modules/UserSlice";
import posts from "../modules/PostsSlice";
import comments from "../modules/CommentsSlice";

const store = configureStore({
  reducer: { user: user, posts: posts, comments: comments },
});

export default store;
