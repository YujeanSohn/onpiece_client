import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Button from "./Button";
import Tag from "./Tag";
import { __post } from "../redux/modules/PostsSlice";
import useInput from "../hooks/useInput";

function PostForm({
  post: {
    title = "",
    content = "",
    category = [],
    level = "",
    headCount = 2,
    recruitmentEndDay = 1671425197822,
    startTime = "00:00:00",
    endTime = "00:00:00",
    startDay = "0000-00-00",
    endDay = "0000-00-00",
  },
}) {
  const dispatch = useDispatch();

  const [studyTitle, onChangeTitle, resetTitle, titleMsg] = useInput(
    title,
    "title"
  );
  const [description, onChangeDescription, resetDescription, descriptionMsg] =
    useInput(content, "content");
  const [selectedOptions, setSelectedOptions] = useState(category);
  const [difficulty, setdifficulty] = useState(level);
  const [recuitCount, setRecuitCount] = useState(headCount);
  const [dueDate, setDueDate] = useState(recruitmentEndDay);
  const [studyStartTime, setstudyStartTime] = useState(startTime);
  const [studyEndTime, setStudyEndTime] = useState(endTime);
  const [studyDate, setstudyDate] = useState(startDay);
  const [endDate, setEndDate] = useState(endDay);

  const handleReset = () => {
    resetTitle();
    resetDescription();
    setSelectedOptions([]);
    setdifficulty("");
    setRecuitCount(2);
    setDueDate(1671425197822);
    setstudyStartTime("");
    setStudyEndTime("");
    setstudyDate("");
    setEndDate("");
  };

  const filterDuplication = selectedOptions.filter((element, index) => {
    return selectedOptions.indexOf(element) === index;
  });

  const handleSelect = (value) => {
    setSelectedOptions([...selectedOptions, value]);
  };

  const handleDelete = (target) => {
    const updated = selectedOptions.filter((selected) => selected !== target);
    setSelectedOptions(updated);
  };

  useEffect((dueDate) => {
    console.log("dueDate");
    var date = new Date(dueDate * 1000);
    var year = date.getFullYear();
    var month = "0" + (date.getMonth() + 1);
    var day = "0" + date.getDate();
    var hour = "0" + date.getHours();
    var minute = "0" + date.getMinutes();
    var second = "0" + date.getSeconds();
    setDueDate(
      year +
        "-" +
        month.substr(-2) +
        "-" +
        day.substr(-2) +
        " " +
        hour.substr(-2) +
        ":" +
        minute.substr(-2) +
        ":" +
        second.substr(-2)
    );
  }, []);
  //'2022-12-20T07:29:26.973Z'

  const postUpdate = () => {
    const post = {
      title: studyTitle,
      content: description,
      category: selectedOptions,
      level: difficulty,
      headCount: recuitCount,
      recruitmentEndDay: dueDate,
      startTime: studyStartTime,
      endTime: studyEndTime,
      startDay: studyDate,
      endDay: endDate,
    };
    dispatch(__post(post));
  };

  return (
    <div>
      <Container>
        <Title>스터디 모집하기</Title>
        <RegisterForm>
          <InputWrapper>
            <Label>스터디 명</Label>
            <Content>
              <Recruits
                placeholder="스터디 명을 입력해주세요 (2자 이상)"
                required
                pattern=".{2,}"
                onChange={onChangeTitle}
                value={studyTitle}
              ></Recruits>
              <ErrorMsg show={titleMsg.length !== 0}>{titleMsg}</ErrorMsg>
            </Content>
          </InputWrapper>
          <InputWrapper>
            <Label>레벨</Label>
            <Content>
              <PostSelect onChange={(e) => setdifficulty(e.target.value)}>
                <option>레벨을 선택해 주세요</option>
                <option value="초급">초급</option>
                <option value="중급">중급</option>
                <option value="고급">고급</option>
              </PostSelect>
            </Content>
          </InputWrapper>
          <div>
            <InputWrapper>
              <Label>언어</Label>
              <Content>
                <PostSelect onChange={(e) => handleSelect(e.target.value)}>
                  <option disabled value="default">
                    언어를 선택해 주세요
                  </option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="HTML/CSS">HTML/CSS</option>
                  <option value="SQL">SQL</option>
                  <option value="Python">Python</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Java">Java</option>
                  <option value="Bash/Shell">Bash/Shell</option>
                  <option value="C#">C#</option>
                  <option value="C++">C++</option>
                  <option value="PHP">PHP</option>
                </PostSelect>
              </Content>
            </InputWrapper>
            <TagBox>
              {filterDuplication.map((select) => (
                <Tag
                  text={select}
                  isRemovable={true}
                  type="category"
                  handler={() => handleDelete(select)}
                >
                  {select}
                </Tag>
              ))}
            </TagBox>
          </div>
          <InputWrapper>
            <Label>모집인원 수</Label>
            <Content>
              <Recruits
                type="number"
                placeholder="모집인원 수를 입력해주세요"
                required
                onChange={(e) => setRecuitCount(e.target.value)}
                value={recuitCount}
              ></Recruits>
            </Content>
          </InputWrapper>
          <InputWrapper>
            <Label>모집 마감 기간</Label>
            <Content>
              <Recruits
                type="datetime-local"
                min={new Date().toISOString().slice(0, -5)}
                onChange={(e) =>
                  setDueDate(
                    Math.floor(new Date(e.target.value).getTime() / 1000)
                  )
                }
              />
            </Content>
          </InputWrapper>
          <InputWrapper>
            <Label>스터디 기간</Label>
            <Content>
              <DateInput
                required
                type="date"
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setstudyDate(e.target.value)}
              />
              <>-</>
              <DateInput
                required
                type="date"
                min={studyDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Content>
          </InputWrapper>
          <InputWrapper>
            <Label>스터디 시간</Label>
            <Content>
              <DateInput
                onChange={(e) => setstudyStartTime(e.target.value + ":00")}
                required
                type="time"
              />
              <>-</>
              <DateInput
                onChange={(e) => setStudyEndTime(e.target.value + ":00")}
                required
                type="time"
              />
            </Content>
          </InputWrapper>
        </RegisterForm>
        <Label>스터디 안내</Label>
        <Content>
          <StudyDesc
            placeholder="스터디 진행 방식, 학습 목표를 안내해주세요.(20자 이상)"
            required
            pattern=".{20,}"
            onChange={onChangeDescription}
          ></StudyDesc>
          <ErrorMsg show={descriptionMsg.length !== 0}>
            {descriptionMsg}
          </ErrorMsg>
        </Content>
        <ButtonBox>
          <Button
            type="accent"
            width="180px"
            text="초기화"
            handler={handleReset}
          />
          <Button width="180px" text="탑승자 모집시작" handler={postUpdate} />
        </ButtonBox>
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 80%;
  height: 90vh;
  background-color: #74b9ff;
  display: flex;
  flex-direction: column;
  padding-left: 200px;
  padding-top: 100px;
  overflow-x: hidden;
`;

const Title = styled.div`
  font-size: 25px;
`;

const RegisterForm = styled.div`
  width: 1000px;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
`;

const Label = styled.div`
  font-size: 15px;
  width: 20%;
  line-height: 50px;
`;

const Content = styled.div`
  width: 150%;
  display: flex;
`;

const Recruits = styled.input`
  border: white;
  width: 400px;
  height: 50px;
  margin-right: 20px;
  margin-left: 20px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  text-indent: 10px;
`;

const DateInput = styled.input`
  border: white;
  width: 178px;
  height: 50px;
  margin-right: 20px;
  margin-left: 20px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  text-indent: 10px;
`;

const PostSelect = styled.select`
  border: white;
  width: 405px;
  height: 50px;
  margin-right: 20px;
  margin-left: 20px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  text-indent: 10px;
`;

const StudyDesc = styled.textarea`
  border: white;
  width: 385px;
  height: 100px;
  margin-right: 20px;
  margin-left: 20px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  text-indent: 10px;
  overflow: auto;
  padding: 10px;
  margin-left: 140px;
`;

const ButtonBox = styled.div`
  width: 450px;
  margin-top: 40px;
  margin-left: 120px;
  display: flex;
  justify-content: space-around;
`;

const TagBox = styled.div`
  margin: 20, 0;
  margin-left: 135px;
`;
const ErrorMsg = styled.p`
  display: ${(props) => (props.show ? "" : "none")};
  color: ${(props) => props.theme.accentColor};
`;

export default PostForm;
