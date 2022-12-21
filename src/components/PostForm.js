import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Button from "./Button";
import Tag from "./Tag";
import useInput from "../hooks/useInput";
import {
  ISOLocalTimeConverter,
  unixTimeConverter,
  unixLocalTimeConverter,
} from "../tools/timeConverter";

import { __addPost } from "../redux/modules/PostsSlice";

function PostForm({
  post: {
    title = "",
    content = "",
    category = [],
    level = "",
    headCount = 2,
    recruitmentEndDay = 0,
    startTime = "00:00:00",
    endTime = "00:00:00",
    startDay = "0000-00-00",
    endDay = "0000-00-00",
  },
}) {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const contentRef = useRef();
  const categoryRef = useRef();
  const levelRef = useRef();
  const limitRef = useRef();
  const dueDateRef = useRef();

  const [studyTitle, onChangeTitle, resetTitle, titleMsg] = useInput(
    title,
    "title"
  );
  const [description, onChangeDescription, resetDescription, descriptionMsg] =
    useInput(content, "content");
  const [limit, onChangeLimit, resetLimit, limitMsg] = useInput(
    headCount,
    "limit"
  );
  const [difficulty, setdifficulty] = useState(level);
  const [selectedOptions, setSelectedOptions] = useState(category);
  const [minDueDate, setMinDueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [studyStartTime, setstudyStartTime] = useState(startTime);
  const [studyEndTime, setStudyEndTime] = useState(endTime);
  const [studyStartDate, setStudyStartDate] = useState(startDay);
  const [studyEndDate, setStudyEndDate] = useState(endDay);

  const handleReset = () => {
    resetTitle();
    resetDescription();
    resetLimit();
    setSelectedOptions(category);
    setdifficulty(level);
    setDueDate(ISOLocalTimeConverter(recruitmentEndDay));
    setstudyStartTime(startTime);
    setStudyEndTime(endTime);
    setStudyStartDate(startDay);
    setStudyEndDate(endDay);
  };

  const handleSelect = ({ target: { value } }) => {
    for (let i = 0; i < selectedOptions.length; i++) {
      if (selectedOptions[i] === value) return;
    }
    setSelectedOptions([...selectedOptions, value]);
  };

  const handleTagDelete = (target) => {
    const updated = selectedOptions.filter((selected) => selected !== target);
    setSelectedOptions(updated);
  };

  useEffect(() => {
    setMinDueDate(ISOLocalTimeConverter(recruitmentEndDay));
    setDueDate(ISOLocalTimeConverter(recruitmentEndDay));
  }, []);

  const isValidated = () => {
    if (studyTitle.length === 0) {
      alert("스터디 명을 입력해주세요");
      titleRef.current.focus();
      return false;
    }
    if (titleMsg.length !== 0) {
      alert("스터디 명은 2자 이상 입력해주세요");
      titleRef.current.focus();
      return false;
    }
    if (limit.length === 0) {
      alert("모집인원 수를 입력해주세요");
      limitRef.current.focus();
      return false;
    }
    if (limitMsg.length !== 0) {
      alert("모집인원 수는 2명 이상 입력해주세요");
      limitRef.current.focus();
      return false;
    }
    if (description.length === 0) {
      alert("스터디 안내 내용을 입력해주세요");
      contentRef.current.focus();
      return false;
    }
    if (descriptionMsg.length !== 0) {
      alert("스터디 안내 내용은 20자 이상 입력해주세요");
      contentRef.current.focus();
      return false;
    }
    if (difficulty === "") {
      alert("레벨을 선택해주세요");
      levelRef.current.focus();
      return false;
    }
    if (selectedOptions.length === 0) {
      alert("언어를 선택해주세요");
      categoryRef.current.focus();
      return false;
    }
    if (
      unixTimeConverter(dueDate) <
      unixLocalTimeConverter(Date.now() + 60 * 60000)
    ) {
      alert(
        "모집 마감 기한 시간은 현재 시간으로부터 한시간 이후로 지정해주세요."
      );
      dueDateRef.current.focus();
      return false;
    }

    return true;
  };

  const postUpdate = () => {
    if (!isValidated()) return;

    const post = {
      title: studyTitle,
      content: description,
      category: selectedOptions,
      level: difficulty,
      headCount: limit,
      recruitmentEndDay: unixTimeConverter(dueDate),
      startTime: studyStartTime,
      endTime: studyEndTime,
      startDay: studyStartDate,
      endDay: studyEndDate,
    };

    dispatch(__addPost(post));
  };

  return (
    <Container>
      <InputWrapper>
        <Label>스터디 명</Label>
        <SingleInputWrapper>
          <Input
            ref={titleRef}
            placeholder="스터디 명을 입력해주세요 (2자 이상)"
            onChange={onChangeTitle}
            value={studyTitle}
          ></Input>
          <ErrorMsg show={titleMsg.length !== 0}>{titleMsg}</ErrorMsg>
        </SingleInputWrapper>
      </InputWrapper>
      <InputWrapper>
        <Label>레벨</Label>
        <SingleInputWrapper>
          <Select
            ref={levelRef}
            value={difficulty}
            onChange={(e) => setdifficulty(e.target.value)}
          >
            <option>레벨을 선택해 주세요</option>
            <option value="초급">초급</option>
            <option value="중급">중급</option>
            <option value="고급">고급</option>
          </Select>
        </SingleInputWrapper>
      </InputWrapper>
      <div>
        <InputWrapper>
          <Label>언어</Label>
          <SingleInputWrapper>
            <Select ref={categoryRef} onChange={handleSelect}>
              <option disabled value="">
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
            </Select>
            {selectedOptions.length !== 0 ? (
              <TagBox>
                {selectedOptions.map((selected) => (
                  <Tag
                    key={selected}
                    text={selected}
                    isRemovable={true}
                    type="category"
                    handler={() => handleTagDelete(selected)}
                  >
                    {selected}
                  </Tag>
                ))}
              </TagBox>
            ) : (
              <></>
            )}
          </SingleInputWrapper>
        </InputWrapper>
      </div>
      <InputWrapper>
        <Label>모집인원 수</Label>
        <SingleInputWrapper>
          <Input
            ref={limitRef}
            type="number"
            placeholder="모집인원 수를 입력해주세요"
            value={limit}
            onChange={onChangeLimit}
          />
          <ErrorMsg show={limitMsg.length !== 0}>{limitMsg}</ErrorMsg>
        </SingleInputWrapper>
      </InputWrapper>
      <InputWrapper>
        <Label>모집 마감 기한</Label>
        <SingleInputWrapper>
          <Input
            ref={dueDateRef}
            type="datetime-local"
            min={minDueDate}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </SingleInputWrapper>
      </InputWrapper>
      <InputWrapper>
        <Label>스터디 기간</Label>
        <DoubleInputWrapper>
          <Input
            type="date"
            min={startDay}
            value={studyStartDate}
            onChange={(e) => setStudyStartDate(e.target.value)}
          />
          <>-</>
          <Input
            type="date"
            min={studyStartDate}
            value={studyEndDate}
            onChange={(e) => setStudyEndDate(e.target.value)}
          />
        </DoubleInputWrapper>
      </InputWrapper>
      <InputWrapper>
        <Label>스터디 시간</Label>
        <DoubleInputWrapper>
          <Input
            type="time"
            value={studyStartTime}
            onChange={(e) => setstudyStartTime(e.target.value + ":00")}
          />
          <>-</>
          <Input
            type="time"
            value={studyEndTime}
            onChange={(e) => setStudyEndTime(e.target.value + ":00")}
          />
        </DoubleInputWrapper>
      </InputWrapper>
      <InputWrapper>
        <Label>스터디 안내</Label>
        <SingleInputWrapper>
          <Description
            ref={contentRef}
            placeholder="스터디 진행 방식, 학습 목표를 안내해주세요.(20자 이상)"
            value={description}
            onChange={onChangeDescription}
          />
          <ErrorMsg show={descriptionMsg.length !== 0}>
            {descriptionMsg}
          </ErrorMsg>
        </SingleInputWrapper>
      </InputWrapper>
      <BtnWrapper>
        <Button type="accent" width="45%" text="초기화" handler={handleReset} />
        <Button
          width="45%"
          text="탑승자 모집 시작하기⛵"
          handler={postUpdate}
        />
      </BtnWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Label = styled.div`
  font-size: 15px;
  width: 30%;
  line-height: 50px;
`;

const SingleInputWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const DoubleInputWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const Input = styled.input`
  border: white;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  text-indent: 10px;
  :hover {
    cursor: pointer;
  }
`;

const Select = styled.select`
  border: white;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  text-indent: 10px;
  :hover {
    cursor: pointer;
  }
`;

const Description = styled.textarea`
  padding: 10px;
  width: (100% - 20px);
  height: 200px;
  font-size: 15px;
  text-indent: 10px;
  overflow: auto;
  border-radius: 10px;
  border: 1px solid white;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
`;

const BtnWrapper = styled.div`
  width: 100%;
  margin: 40px 0;
  display: flex;
  justify-content: space-between;
`;

const TagBox = styled.div`
  width: 100%;
  padding: 10px 0;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

const ErrorMsg = styled.p`
  margin-top: 10px;
  width: 100%;
  display: ${(props) => (props.show ? "" : "none")};
  font-size: 12px;
  font-weight: 800;
  color: ${(props) => props.theme.accentColor};
`;

export default PostForm;
