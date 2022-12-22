import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Post from "../components/Post";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  __getAppliedStudies,
  __getFinishedStudy,
  __getUserInfo,
  __updateUserDescription,
} from "../redux/modules/UserSlice";

function User() {
  const applied = useSelector((store) => store.user.applied);
  const finished = useSelector((store) => store.user.finished);
  const userInfo = useSelector((store) => store.user.userInfo);

  const dispatch = useDispatch();

  const { id } = useParams();

  const [description, setDescription] = useState("");
  useEffect(() => {
    if (!userInfo?.description) return;
    setDescription(userInfo.description);
  }, [userInfo]);

  const handleDescriptionUpdate = (event) => {
    setDescription(event.currentTarget.value);
  };

  const ref = useRef();
  const [isModify, setIsModify] = useState(false);
  const handleModify = () => {
    setIsModify(!isModify);
  };

  useEffect(() => {
    if (!ref?.current) return;
    if (isModify) ref.current.focus();
  }, [isModify]);

  const handleExecuteUpdate = async () => {
    dispatch(__updateUserDescription({ id, description }));
    setIsModify(!isModify);
  };

  useEffect(() => {
    dispatch(__getAppliedStudies(id));
    dispatch(__getFinishedStudy(id));
    dispatch(__getUserInfo(id));
  }, []);

  return (
    <Wrapper>
      <Content>
        <Title>마이페이지</Title>
        <SubTitle>내 정보</SubTitle>
        <TopContent>
          <UserInfoBox>
            <Email>
              <Label>이메일</Label> <>{userInfo.email}</>
            </Email>
            <Description>
              <Label>내 소개글</Label>
              {isModify === false ? (
                <>
                  {description.length === 0 ? (
                    <EmptyDescription>
                      아직 작성한 내 소개글이 없습니다
                    </EmptyDescription>
                  ) : (
                    description
                  )}
                </>
              ) : (
                <Input
                  ref={ref}
                  value={description}
                  onChange={handleDescriptionUpdate}
                />
              )}
            </Description>
          </UserInfoBox>
          <BtnWrapper>
            {isModify !== false ? (
              <>
                <Button
                  text="내 소개글 수정"
                  handler={handleExecuteUpdate}
                ></Button>
                <Button
                  type="cancel"
                  text="취소"
                  handler={handleModify}
                ></Button>
              </>
            ) : (
              <Button text="내 소개글 수정" handler={handleModify}></Button>
            )}
          </BtnWrapper>
        </TopContent>
        <StudyType>탑승한 스터디</StudyType>
        <StudyBox>
          {applied.length === 0 ? (
            <InfoBox>아직 탑승한 스터디가 없습니다</InfoBox>
          ) : (
            applied.map((post) => (
              <Post key={post.postId} post={post} isApplied={true} />
            ))
          )}
        </StudyBox>
        <StudyType>내가 만든 스터디</StudyType>
        <StudyBox>
          {finished.length === 0 ? (
            <InfoBox>아직 탑승한 스터디가 없습니다</InfoBox>
          ) : (
            finished.map((post) => (
              <Post key={post.postId} post={post} isPublisher={true} />
            ))
          )}
        </StudyBox>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.mainColor};
`;

const Content = styled.div`
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

const SubTitle = styled.h2`
  margin-top: 30px;
`;

const TopContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UserInfoBox = styled.div`
  width: 100%;
  min-width: 300px;
  height: 150px;
  margin-top: 30px;
  border-radius: 10px;
  display: flex;
  background-color: #eeeeee;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 20px;
`;

const StudyType = styled.div`
  margin-top: 40px;
`;

const StudyBox = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  overflow-y: auto;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  font-weight: 800;
  background-color: rgba(255, 255, 255, 0.5);
  color: ${(props) => props.theme.mainColor};
`;

const Email = styled.div`
  margin-left: 20px;
  font-weight: bold;
`;

const Label = styled.div`
  width: 10%;
  float: left;
`;

const EmptyDescription = styled.div`
  color: tomato;
`;

const Description = styled.div`
  margin-left: 20px;
  font-weight: bold;
  display: flex;
`;

const Input = styled.textarea`
  width: 80%;
  height: 50px;
  overflow: auto;
`;

export default User;
