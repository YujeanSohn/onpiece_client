import React from "react";
import styled from "styled-components";

import Tag from "./Tag";
import Progressbar from "./Progressbar";
import dateTimeParser from "../tools/dateTimeParser";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Post({ width = 18, post, isApplied = false }) {
  const navigate = useNavigate();

  return (
    <Wrapper width={`${width}%`}>
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
      <BtnWrapper>
        {isApplied ? (
          <Button type="cancel" text="하차하기" />
        ) : (
          <Button
            type="main"
            text="탑승하기"
            disabled={post.headCount === post.applicants.length}
          />
        )}
        <Button
          text="구경하기"
          handler={() => navigate(`/post/${post.postId}`)}
        />
      </BtnWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: ${(props) => props.width};
  padding: 2%;
  margin: 20px 1.3%;
  float: left;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 2px solid ${(props) => props.theme.subColor};
  border-radius: 10px;
  background-color: white;
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

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default Post;
