import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import ToggleMsg from "../ToggleMsg";
import Button from "../Button";
import useHandler from "../../hooks/useHandler";

import {
  __emailCheck,
  __nicknameCheck,
  __signUp,
} from "../../redux/modules/UserSlice";

function Signup({ handleChangeForm }) {
  const dispatch = useDispatch();
  const isEmailChecked = useSelector((store) => store.user.isEmailChecked);
  const isNicknameChecked = useSelector(
    (store) => store.user.isNicknameChecked
  );
  const isEmailDuplicated = useSelector(
    (store) => store.user.isEmailDuplicated
  );
  const isNicknameDuplicated = useSelector(
    (store) => store.user.isNicknameDuplicated
  );

  const [email, onChangeEmail] = useHandler("");
  const [name, onChangeName] = useHandler("");
  const [password, onChangePassword] = useHandler("");
  const [passwordCheck, onChangePasswordCheck] = useHandler("");
  const [description, onChangeDescription] = useHandler("");

  const checkEmailDuplication = () => {
    if (email.length === 0) return alert("이메일을 입력해주세요");
    dispatch(__emailCheck({ email }));
  };

  const checkNicknameDuplication = () => {
    if (name.length === 0) return alert("닉네임을 입력해주세요");
    dispatch(__nicknameCheck({ name }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== passwordCheck)
      return alert("비밀번호가 일치하지 않습니다.");

    let data = {
      email: email,
      nickname: name,
      password: password,
      description: description,
    };

    dispatch(__signUp(data));
  };
  return (
    <Wrapper>
      <ContentWrapper onSubmit={onSubmitHandler}>
        <RegisterForm>
          <InputWrapper>
            <Label>Email</Label>
            <Content>
              <Input
                type="email"
                placeholder="이메일을 입력해 주세요"
                required
                onChange={onChangeEmail}
              />
              <ToggleMsg
                text={
                  isEmailChecked && !isEmailDuplicated
                    ? "사용 가능한 이메일입니다"
                    : "이미 등록된 이메일입니다"
                }
                type={
                  isEmailChecked && !isEmailDuplicated ? "success" : "error"
                }
                show={isEmailChecked}
              />
            </Content>
            <Button
              type="default"
              text="중복확인"
              width="20%"
              handler={checkEmailDuplication}
            ></Button>
          </InputWrapper>
          <InputWrapper>
            <Label>닉네임</Label>
            <Content>
              <Input
                placeholder="닉네임을 입력해 주세요"
                required
                onChange={onChangeName}
              />
              <ToggleMsg
                text={
                  isNicknameChecked && !isNicknameDuplicated
                    ? "사용 가능한 닉네임입니다"
                    : "이미 등록된 닉네임입니다"
                }
                type={
                  isNicknameChecked && !isNicknameDuplicated
                    ? "success"
                    : "error"
                }
                show={isNicknameChecked}
              />
            </Content>
            <Button
              type="default"
              text="중복확인"
              width="20%"
              handler={checkNicknameDuplication}
            ></Button>
          </InputWrapper>
          <InputWrapper>
            <Label>PW</Label>
            <Content>
              <Input
                type="password"
                placeholder="패스워드를 입력해 주세요"
                onChange={onChangePassword}
                required
              />
            </Content>
          </InputWrapper>
          <InputWrapper>
            <Label>PW CHECK</Label>
            <Content>
              <Input
                type="password"
                placeholder="패스워드를 한번 더 입력해 주세요"
                onChange={onChangePasswordCheck}
                required
              />
              <ToggleMsg />
            </Content>
          </InputWrapper>
          <InputWrapper>
            <Label>소개글</Label>
            <Content>
              <Input
                placeholder="소개글을 입력해 주세요(선택)"
                onChange={onChangeDescription}
              />
            </Content>
          </InputWrapper>
        </RegisterForm>
        <BtnWrapper>
          <Button
            type="default"
            text="뒤로가기"
            width="180px"
            handler={handleChangeForm}
          />
          <Button type="main" text="가입하기" width="180px"></Button>
        </BtnWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const RegisterForm = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.mainColor};
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const Label = styled.span`
  width: 10%;
  font-size: 12px;
`;

const Content = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  border: white;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  text-indent: 10px;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

export default Signup;
