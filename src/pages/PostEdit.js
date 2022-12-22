import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import PostForm from "../components/PostForm";

function PostEdit() {
  const detailPost = useSelector((store) => store.posts.post);

  const initialPost = {
    title: detailPost.title,
    content: detailPost.content,
    category: detailPost.category,
    level: detailPost.level,
    headCount: detailPost.headCount,
    recruitmentEndDay: detailPost.recruitmentEndDay,
    startTime: detailPost.startTime,
    endTime: detailPost.endTime,
    startDay: detailPost.startDay,
    endDay: detailPost.endDay,
  };

  return (
    <Wrapper>
      <Content>
        <ContentHeader>
          <PageTitle>스터디 수정하기</PageTitle>
        </ContentHeader>
        <PostForm post={initialPost}></PostForm>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: ${(props) => props.minHeight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainColor};
`;

const Content = styled.div`
  width: 500px;
  padding: 60px;
`;

const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

export default PostEdit;
