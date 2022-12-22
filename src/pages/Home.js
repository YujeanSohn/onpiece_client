import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Button from "../components/Button";
import Post from "../components/Post";

import { __getPosts } from "../redux/modules/PostsSlice";
import { __getAppliedStudies } from "../redux/modules/UserSlice";

function Home({ minHeight }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.user.userInfo);
  const userId = !userInfo?.userId
    ? localStorage.getItem("userId")
    : userInfo.userId;

  useEffect(() => {
    dispatch(__getPosts());
    dispatch(__getAppliedStudies(userId));
  }, [dispatch]);
  const applied = useSelector((store) => store.user.applied);

  const posts = useSelector((store) => store.posts.posts);
  const [lineHeight, setLineHeight] = useState(0);
  const ref = useRef();
  useEffect(() => {
    if (posts.length === 0) {
      if (!ref?.current) return;
      setLineHeight(minHeight - ref.current.clientHeight - 120);
    }
  }, [minHeight, ref, posts.length]);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/post");
  };

  return (
    <Wrapper minHeight={`${minHeight}px`}>
      <Content>
        <ContentHeader ref={ref}>
          <Title>스터디 목록</Title>
          <Button text={`스터디 모집하기 🛟`} handler={handleNavigate} />
        </ContentHeader>
        <PostList>
          {posts.length === 0 ? (
            <InfoBox lineHeight={`${lineHeight}px`}>
              🚣‍♂ 새로운 스터디를 모집해보세요!
            </InfoBox>
          ) : (
            posts.map((post) => {
              let isApplied = false;
              for (let i = 0; i < applied.length; i++) {
                if (applied[i].postId === post.postId) {
                  isApplied = true;
                }
              }

              return (
                <Post
                  key={post.postId}
                  post={post}
                  isApplied={isApplied}
                  isPublisher={userId === post.userId}
                />
              );
            })
          )}
        </PostList>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: ${(props) => props.minHeight};
  background-color: ${(props) => props.theme.mainColor};
`;

const Content = styled.div`
  padding: 40px;
`;

const ContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

const PostList = styled.div`
  padding: 20px 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 100%;
  line-height: ${(props) => props.lineHeight};
  text-align: center;
  color: white;
  font-weight: 600;
`;

export default Home;
