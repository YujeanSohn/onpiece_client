import React from "react";
import styled from "styled-components";

import PostForm from "../components/PostForm";
import { ISOLocalTimeConverter } from "../tools/timeConverter";

function PostCreate() {
  const today = new Date();
  const weekAfter = (today) => {
    return new Date(today).setDate(today.getDate() + 7);
  };

  const initialPost = {
    title: "",
    content: "",
    category: [],
    level: "",
    headCount: 2,
    recruitmentEndDay: Date.now(),
    startTime: "00:00:00",
    endTime: "00:00:00",
    startDay: ISOLocalTimeConverter(today).split("T")[0],
    endDay: ISOLocalTimeConverter(weekAfter(today)).split("T")[0],
  };

  return (
    <Wrapper>
      <Content>
        <ContentHeader>
          <PageTitle>스터디 모집하기</PageTitle>
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

export default PostCreate;
