import React, { useEffect, useState } from "react";
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
  __userDescriptionUpdate,
} from "../redux/modules/UserSlice";

function User() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [description, setDescription] = useState();
  const [isModify, setIsModify] = useState(false);

  const modifyCancel = () => {
    setIsModify(!isModify);
  };

  const onUpdateHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const onEditHandler = async () => {
    dispatch(__userDescriptionUpdate({ id, description: description })).then(
      setisTextFilled(description),
      setIsModify(!isModify)
    );
  };

  const applied = useSelector((store) => store.user.applied);
  const finished = useSelector((store) => store.user.finished);
  const userInfo = useSelector((store) => store.user.userinfo);

  const [isTextFilled, setisTextFilled] = useState("");

  useEffect(() => {
    dispatch(__getAppliedStudies(id));
    dispatch(__getFinishedStudy(id));
    dispatch(__getUserInfo(id));
  }, []);

  useEffect(() => {
    if (userInfo?.description === null || userInfo?.description === undefined)
      return;
    setisTextFilled(
      userInfo.description.length === 0
        ? "!입력하신 소개글이 없습니다!"
        : userInfo.description
    );
  }, [userInfo]);

  return (
    <Wrapper>
      <Content>
        <Title>마이페이지</Title>
        <SubTitle>내정보</SubTitle>
        <TopContent>
          <UserInfoBox>
            <Email>
              이메일 <>{userInfo.email}</>
            </Email>
            <Introduce>
              내 소개글
              {isModify === false ? (
                <>{isTextFilled}</>
              ) : (
                <EditInput onChange={onUpdateHandler} />
              )}
            </Introduce>
          </UserInfoBox>
          <BtnWrapper>
            {isModify !== false ? (
              <>
                <Button text="내 소개글 수정" handler={onEditHandler}></Button>
                <Button text="취소" handler={modifyCancel}></Button>
              </>
            ) : (
              <Button text="내 소개글 수정" handler={modifyCancel}></Button>
            )}
          </BtnWrapper>
        </TopContent>
        <StudyType>탑승한 스터디</StudyType>
        <StudyBox>
          {applied.length === 0 ? (
            <InfoBox>아직 탑승한 스터디가 없습니다</InfoBox>
          ) : (
            applied.map((post) => (
              <Post key={post.postId} post={post} width={20} />
            ))
          )}
        </StudyBox>
        <StudyType>내가 만든 스터디</StudyType>
        <StudyBox>
          {finished.length === 0 ? (
            <InfoBox>아직 탑승한 스터디가 없습니다</InfoBox>
          ) : (
            finished.map((post) => (
              <Post key={post.postId} post={post} width={20} />
            ))
          )}
        </StudyBox>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
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
`;

const StudyType = styled.div`
  margin-top: 40px;
`;

const StudyBox = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  overflow-x: auto;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 100px;
  line-height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  text-align: center;
`;

const Email = styled.div`
  margin-left: 20px;
  font-weight: bold;
`;

const Introduce = styled.div`
  margin-left: 20px;
  font-weight: bold;
  display: flex;
`;

const EditInput = styled.textarea`
  width: 80%;
  height: 50px;
  overflow: auto;
`;

export default User;
