import React from "react";
import styled from "styled-components";
import Button from "../components/Button";

import { useState } from "react";
import Tag from "../components/Tag";

function PostEditPage() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [recruitPeriod, setRecruitPeriod] = useState();
  const [studyDate, setstudyDate] = useState();

  const [studyintro, setStudyintro] = useState();

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

  return (
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
            ></Recruits>
          </Content>
        </InputWrapper>
        <InputWrapper>
          <Label>레벨</Label>
          <Content>
            <PostSelect>
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
                <option disabled>언어을 선택해 주세요</option>
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
          <div style={{ margin: "30px" }}>
            {filterDuplication.map((select) => (
              <Tag
                text={select}
                type={`category`}
                handler={() => handleDelete(select)}
              >
                {select}
              </Tag>
            ))}
          </div>
        </div>
        <InputWrapper>
          <Label>모집인원 수</Label>
          <Content>
            <Recruits
              type="number"
              placeholder="모집인원 수를 입력해주세요"
              required
            ></Recruits>
          </Content>
        </InputWrapper>
        <InputWrapper>
          <Label>모집기간</Label>
          <Content>
            <DateInput
              required
              type="date"
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setRecruitPeriod(e.target.value)}
            />
            <>-</>
            <DateInput required type="date" min={recruitPeriod} />
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
            <DateInput required type="date" min={studyDate} />
          </Content>
        </InputWrapper>
        <InputWrapper>
          <Label>스터디 시간</Label>
          <Content>
            <DateInput required type="time" />
            <>-</>
            <DateInput required type="time" />
          </Content>
        </InputWrapper>
      </RegisterForm>
      <Label>스터디 안내</Label>
      <Content>
        <StudyDesc
          placeholder="스터디 진행 방식, 학습 목표를 안내해주세요.(20자 이상)"
          required
          pattern=".{20,}"
          onChange={(e) => setStudyintro(e.target.value)}
        ></StudyDesc>
      </Content>
      <ButtonBox>
        <ResetButton type="reset">초기화</ResetButton>
        <Button text={`탑승자 모집시작`} width={`180px`} />
      </ButtonBox>
    </Container>
  );
}

const Container = styled.form`
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
  width: 500px;
  margin-top: 40px;
  margin-left: 30px;
  display: flex;
  justify-content: space-around;
`;

const ResetButton = styled.button`
  background-color: tomato;
  width: 180px;
  border: none;
  border-radius: 5px;
`;

export default PostEditPage;
