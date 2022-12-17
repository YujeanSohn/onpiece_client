import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Button from "../components/Button";
import Post from "../components/Post";

const Wrapper = styled.div`
  width: 100%;
  min-height: ${(props) => props.minHeight};
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
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 100%;
  line-height: ${(props) => props.lineHeight};
  text-align: center;
  color: white;
  font-weight: 600;
`;

function Home({ minHeight }) {
  const posts = useSelector((store) => store.posts.posts);
  const [lineHeight, setLineHeight] = useState(0);
  const ref = useRef();
  useEffect(() => {
    if (posts.length === 0) {
      if (!ref?.current) return;
      setLineHeight(minHeight - ref.current.clientHeight - 120);
    }
  }, [minHeight, ref, posts.length]);

  return (
    <Wrapper minHeight={`${minHeight}px`}>
      <Content>
        <ContentHeader ref={ref}>
          <Title>스터디 목록</Title>
          <Button text={`스터디 모집하기 🛟`} />
        </ContentHeader>
        <PostList>
          {posts.length === 0 ? (
            <InfoBox lineHeight={`${lineHeight}px`}>
              🚣‍♂ 새로운 스터디를 모집해보세요!
            </InfoBox>
          ) : (
            posts.map((post) => <Post key={post.postId} post={post} />)
          )}
        </PostList>
      </Content>
    </Wrapper>
  );
}

export default Home;
