import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Post from "../Post";

import { __getPostsStatics } from "../../redux/modules/PostsSlice";

function Promotion(props) {
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(__getPostsStatics());
  //   }, []);
  const totalPostsCount = useSelector((store) => store.posts.totalPostsCount);
  const completedPostsCount = useSelector(
    (store) => store.posts.completedPostsCount
  );
  const posts = useSelector((store) => store.posts.posts);
  return (
    <Wrapper>
      <Title>
        <MainTitle>너👇 내 온라인 코딩스터디 동료가 되라!</MainTitle>
        <Statics>
          🚢 온피스에서는 {totalPostsCount}개 중 {completedPostsCount}개의
          스터디가 모집에 성공했습니다 <TransformedIcon>🚢</TransformedIcon>
        </Statics>
        <PromotionText>현재 진행중인 스터디를 구경해보세요🏄‍♀</PromotionText>
      </Title>
      <PostList>
        {posts.map((post) => (
          <Post key={post.postId} post={post} width={40} />
        ))}
      </PostList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainTitle = styled.h1`
  font-size: 30px;
`;

const Statics = styled.h2`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 800;
`;

const TransformedIcon = styled.span`
  transform: rotateY(180deg);
`;

const PromotionText = styled.h2`
  margin-top: 50px;
`;

const PostList = styled.div`
  margin-top: 20px;
  padding: 20px;
  width: (100%-40px);
  height: 60%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Promotion;
