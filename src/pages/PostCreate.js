import React from "react";

import PostForm from "../components/PostForm";

function PostCreate() {
  const post = {
    title: "",
    content: "",
    category: [],
    level: "",
    headCount: 2,
    recruitmentEndDay: 1671425197822,
    startTime: "00:00:00",
    endTime: "00:00:00",
    startDay: "0000-00-00",
    endDay: "0000-00-00",
  };
  return <PostForm post={post}></PostForm>;
}

export default PostCreate;
