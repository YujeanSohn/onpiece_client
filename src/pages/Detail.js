import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../components/Button";
import Progressbar from "../components/Progressbar";
import Tag from "../components/Tag";
import dateTimeParser from "../tools/dateTimeParser";
import CommentList from "../components/Detail/CommentList";

import { __deletePost, __getPost } from "../redux/modules/PostsSlice";
import {
  __applyStudy,
  __dropStudy,
  __getAppliedStudies,
} from "../redux/modules/UserSlice";

function Detail({ minHeight }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGetPost = () => {
    try {
      dispatch(__getPost(id));
    } catch (e) {
      navigate("/");
    }
  };
  useEffect(() => {
    handleGetPost();
  }, []);
  const isLoading = useSelector((store) => store.posts.isLoading);
  const post = useSelector((store) => store.posts.post);
  const userInfo = useSelector((store) => store.user.userInfo);
  const userId = !userInfo?.userId
    ? localStorage.getItem("userId")
    : userInfo.userId;

  const levelMsg = () => {
    switch (post.level) {
      case "초급":
        return "항해 웹종반 강의를 수강 완료한 분들에게 적합한 난이도입니다.";
      case "중급":
        return "항해 주특기 주차의 과제를 무리없이 진행하신 분들에게 적합한 난이도입니다.";
      case "고급":
        return "항해 실전 프로젝트를 완료한 분들에게 적합한 난이도입니다.";
      default:
        return "잘못된 레벨 정보입니다.";
    }
  };

  const ProgressMsg = (percentage) => {
    if (percentage === 0)
      return `기름 만땅으로 달릴 준비 완료 ⛴ 가장 첫번째 탑승자가 되어주세요!`;
    else if (percentage <= 20)
      return `출항 준비 중인 스터디입니다 ⚓ 함께 지식의 샘으로 떠날 준비되셨나요?`;
    else if (percentage <= 50)
      return `출항 준비가 한창인 스터디입니다 🌊 함께라면 높은 파도도 극복할 수 있어요`;
    else if (percentage <= 70)
      return `🔥 출항 준비가 완료되어가는 스터디입니다 🔥 어서 탑승해 주세요!`;
    else if (percentage === 100)
      return `출항 준비가 완료된 스터디입니다 🚣‍♀ 아쉽지만 다음 기회에 함께해요!`;
    else return `잘못된 percentage 정보입니다.`;
  };

  const handleEdit = () => {
    navigate(`/post/edit/${id}`);
  };

  const handleDelete = () => {
    dispatch(__deletePost(id));
    navigate(`/`);
  };

  const applied = useSelector((store) => store.user.applied);
  const [isApplied, setIsApplied] = useState(false);
  useEffect(() => {
    if (applied.length === 0) return;
    applied.findIndex((v) => v.postId == id) < 0
      ? setIsApplied(false)
      : setIsApplied(true);
  }, [applied]);
  useEffect(() => {
    if (applied.length === 0) {
      dispatch(__getAppliedStudies(localStorage.getItem("userId")));
    }
  }, []);

  const [applicants, setApplicants] = useState(post.applicants);
  useEffect(() => {
    setApplicants(post.applicants);
  }, [post]);

  const handleApply = () => {
    dispatch(__applyStudy(id));
    dispatch(__getPost(id));
  };

  const handleDrop = () => {
    dispatch(__dropStudy(id));
    dispatch(__getPost(id));
  };

  return (
    <Wrapper minHeight={`${minHeight}px`}>
      <Content>
        <ContentHeader>
          <PageTitle>스터디 구경하기</PageTitle>
        </ContentHeader>
        {isLoading ? (
          <LoadingMsg>데이터를 불러오는 중입니다.</LoadingMsg>
        ) : (
          <>
            <TopContent>
              <TitleWrapper>
                <TextWrapper>
                  <ContentTitle>{post.title}</ContentTitle>
                  <span>{`${dateTimeParser(
                    post.recruitmentEndDay
                  )} 까지 모집`}</span>
                </TextWrapper>
                <BtnWrapper show={post.userId === userId}>
                  <Button type="default" text="수정하기" handler={handleEdit} />
                  <Button
                    type="accent"
                    text="삭제하기"
                    handler={handleDelete}
                  />
                </BtnWrapper>
              </TitleWrapper>
              <ProgressInfoWrapper>
                <ProgressbarWrapper>
                  <Progressbar
                    width={50}
                    denominator={post.headCount}
                    numerator={applicants.length}
                  ></Progressbar>
                  <ProgressInfoText>
                    {ProgressMsg(
                      Math.trunc((applicants.length / post.headCount) * 100)
                    )}
                  </ProgressInfoText>
                </ProgressbarWrapper>
                {isApplied ? (
                  <Button
                    text="하차하기"
                    disabled={post.userId === userId}
                    handler={handleDrop}
                  />
                ) : (
                  <Button
                    text="탑승하기"
                    disabled={post.userId === userId}
                    handler={handleApply}
                  />
                )}
              </ProgressInfoWrapper>
            </TopContent>
            <TagBoxWrapper>
              <TagBox>
                <Tag type="level" text={post.level} />
                <div>{levelMsg(post.level)}</div>
              </TagBox>
              <TagBox>
                {post.category.map((v) => (
                  <Tag key={v} type="category" text={v} />
                ))}
              </TagBox>
            </TagBoxWrapper>
            <Label>스터디 안내</Label>
            <BottomContent>
              <LeftContent>
                <TextBoxWrapper>
                  <TextBox>{post.content}</TextBox>
                </TextBoxWrapper>
              </LeftContent>
              <RightContent>
                <DescriptionBox>
                  <Label>{`👨‍✈ ${post.nickname} 선장님의 자기 소개`}</Label>
                  <div>{post.userDescription}</div>
                  <Label>
                    📜 {`${post.nickname} 선장님이 이끌었던 스터디`}
                  </Label>
                  <StudyTitleBoxWrapper>
                    <StudyBoxContainer>
                      {post.exPosts.map((v) => (
                        <StudyTitleBox key={v.postId}>
                          <Link to={`/post/${v.postId}`}>{v.title}</Link>
                        </StudyTitleBox>
                      ))}
                    </StudyBoxContainer>
                  </StudyTitleBoxWrapper>
                </DescriptionBox>
                <InfoBoxWrapper>
                  <InfoBox>
                    <InfoLabel>스터디기간</InfoLabel>
                    <Info>
                      {post.startDay} - {post.endDay}
                    </Info>
                  </InfoBox>
                  <InfoBox>
                    <InfoLabel>스터디시간</InfoLabel>
                    <Info>
                      {post.startTime} - {post.endTime}
                    </Info>
                  </InfoBox>
                </InfoBoxWrapper>
              </RightContent>
            </BottomContent>
            <CommentList postId={id} />
          </>
        )}
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

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

const LoadingMsg = styled.div`
  width: 100%;
  height: 50vh;
  line-height: 50vh;
  text-align: center;
  color: white;
  font-weight: 800;
`;

const TopContent = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: flex-end;
  gap: 20px;
  font-weight: 600;
`;

const ContentTitle = styled.h2`
  font-size: 40px;
`;

const BtnWrapper = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: row;
  gap: 20px;
`;

const ProgressInfoWrapper = styled.div`
  padding: 20px;
  width: (100% - 40px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 3px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const ProgressbarWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProgressInfoText = styled.div`
  float: left;
  padding: 20px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const TagBoxWrapper = styled.div`
  padding: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TagBox = styled.div`
  margin: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const Label = styled.div`
  padding: 20px 0;
  width: 100%;
  font-size: 20px;
  font-weight: 800;
`;

const BottomContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

const LeftContent = styled.div`
  float: left;
  width: 48%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TextBoxWrapper = styled.div`
  padding: 20px;
  height: 100%;
  border: 2px solid ${(props) => props.theme.subColor};
  border-radius: 15px;
  background-color: white;
`;

const TextBox = styled.div`
  height: 100%;
  white-space: pre-wrap;
  overflow-y: auto;
`;

const RightContent = styled.div`
  float: right;
  padding: 20px 0;
  width: 48%;
`;

const DescriptionBox = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 2px solid ${(props) => props.theme.subColor};
  border-radius: 15px;
  background-color: white;
`;

const StudyTitleBoxWrapper = styled.div`
  width: 100%;
  padding: 10px 0;
  overflow-x: auto;
`;

const StudyBoxContainer = styled.div`
  width: auto;
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  ::after {
    content: "";
    display: block;
    clear: both;
  }
`;

const StudyTitleBox = styled.div`
  float: left;
  width: 200px;
  padding: 20px;
  flex: 0 0 200px;
  border: 3px solid ${(props) => props.theme.mainColor};
  border-radius: 15px;
  font-size: 20px;
  font-weight: 600;
  :hover {
    cursor: pointer;
  }
`;

const InfoBoxWrapper = styled.div`
  margin-top: 20px;
`;

const InfoBox = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InfoLabel = styled.span`
  width: 30%;
  font-size: 18px;
  font-weight: 600;
`;

const Info = styled.div`
  width: 68%;
  font-size: 18px;
`;

export default Detail;
