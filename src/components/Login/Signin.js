import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Button from "../Button";
import useHandler from "../../hooks/useHandler";

import { __signIn } from "../../redux/modules/UserSlice";

function Signin({ handleChangeForm }) {
  const dispatch = useDispatch();
  const [loginEmail, LoginEmailHandler] = useHandler("");
  const [loginPassword, LoginPasswordHandler] = useHandler("");

  const onLoginHandler = (event) => {
    event.preventDefault();

    let login = {
      email: loginEmail,
      password: loginPassword,
    };

    dispatch(__signIn(login));
  };

  return (
    <Wrapper>
      <ContentWrapper onSubmit={onLoginHandler}>
        <LoginForm>
          <InputWrapper>
            <span>ID</span>
            <Input
              type="email"
              placeholder="이메일을 입력해주세요"
              required
              onChange={LoginEmailHandler}
            ></Input>
          </InputWrapper>
          <InputWrapper>
            <span>PW</span>
            <Input
              type="password"
              placeholder="패스워드를 입력해 주세요"
              required
              onChange={LoginPasswordHandler}
            ></Input>
          </InputWrapper>
        </LoginForm>
        <BtnWrapper>
          <Button
            type="default"
            text="회원가입"
            width="180px"
            handler={handleChangeForm}
          ></Button>
          <Button type="login" text="로그인" width="180px" />
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
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const LoginForm = styled.div`
  width: 100%;
  padding: 40px 20px;
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
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
`;

const Input = styled.input`
  border: white;
  width: 80%;
  height: 50px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  text-indent: 10px;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

export default Signin;
