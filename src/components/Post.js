import React from "react";
import styled from "styled-components";

import Tag from "./Tag";
import Progressbar from "./Progressbar";
import dateTimeParser from "../tools/dateTimeParser";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: ${(props) => props.width};
  padding: 2%;
  margin-top: 20px;
  float: left;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 2px solid ${(props) => props.theme.subColor};
  border-radius: 10px;
  background-color: white;
  :hover {
    cursor: pointer;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const SubTitle = styled.div`
  font-size: 14px;
`;

const TagBox = styled.div`
  padding: 10px 0;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Label = styled.span`
  width: 30%;
  font-size: 14px;
  font-weight: 600;
`;

const Info = styled.div`
  font-size: 14px;
  width: 68%;
`;

function Post({ width = 20, post }) {
  const navigate = useNavigate();
  return (
    <Wrapper  width={`${width}%`} onClick={() => navigate(`/post/${post.id}`)}>
      <Title>{post.title}</Title>
      <SubTitle>👨‍✈{post.nickname} 선장님이 이끄는 스터디</SubTitle>
      <TagBox>
        <Tag type="level" text={post.level}></Tag>
      </TagBox>
      <TagBox>
        {post.category.map((v) => (
          <Tag key={v} type="category" text={v}></Tag>
        ))}
      </TagBox>
      <InfoBox>
        <Label>모집기간</Label>
        <Info>{`${dateTimeParser(post.recruitmentEndDay)} 까지`}</Info>
      </InfoBox>
      <InfoBox>
        <Label>스터디기간</Label>
        <Info>
          {post.startDay} - {post.endDay}
        </Info>
      </InfoBox>
      <InfoBox>
        <Label>스터디시간</Label>
        <Info>
          {post.startTime} - {post.endTime}
        </Info>
      </InfoBox>
      <InfoBox>
        <Label>모집인원</Label>
        <Info>
          <Progressbar
            denominator={post.headCount}
            numerator={post.applicants.length}
          ></Progressbar>
        </Info>
      </InfoBox>
    </Wrapper>
  );
}

export default Post;
