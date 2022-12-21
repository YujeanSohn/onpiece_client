import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

function Signup({ handleChangeForm }) {
  const dispatch = useDispatch();
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
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  // update isEmailChecked to false if email state is changed
  useEffect(() => {
    setIsEmailChecked(false);
  }, [email]);
  //  update isEmailChecked to true if check email duplication is done
  const checkEmailDuplication = () => {
    if (email.length === 0) return alert("이메일을 입력해주세요");
    dispatch(__emailCheck({ email }));
    setIsEmailChecked(true);
  };

  // update isNicknameChecked to false if nickname state is changed
  useEffect(() => {
    setIsNicknameChecked(false);
  }, [name]);
  // update isNicknameChecked to true if check nickname duplication is done
  const checkNicknameDuplication = () => {
    if (name.length === 0) return alert("닉네임을 입력해주세요");
    dispatch(__nicknameCheck({ name }));
    setIsNicknameChecked(true);
  };

  // update isPWSame on password and passwordCheck state change
  const [isPWSame, setIsPWSame] = useState(false);
  useEffect(() => {
    if (password.length !== 0 && password === passwordCheck) {
      setIsPWSame(true);
      return;
    }

    setIsPWSame(false);
  }, [password, passwordCheck]);
  // update isPWChecked on password check first onChange event
  // to show error message after first validation.
  const [isPWChecked, setIsPWChecked] = useState(false);
  const handlePWChange = (e) => {
    if (!isPWChecked) setIsPWChecked(true);
    onChangePasswordCheck(e);
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    let data = {
      email: email,
      nickname: name,
      password: password,
      confirm: passwordCheck,
      description: description,
    };

    dispatch(__signUp(data));
    navigate("/login");
  };
  return (
    <Wrapper>
      <ContentWrapper>
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
            </Content>
            <Button
              type="default"
              text="중복확인"
              width="20%"
              handler={checkEmailDuplication}
            ></Button>
          </InputWrapper>
          <MsgWrapper show={isEmailChecked}>
            <Msg show={isEmailChecked}>
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
            </Msg>
          </MsgWrapper>
          <InputWrapper>
            <Label>닉네임</Label>
            <Content>
              <Input
                placeholder="닉네임을 입력해 주세요"
                required
                disabled={!isEmailChecked || isEmailDuplicated}
                onChange={onChangeName}
              />
            </Content>
            <Button
              type="default"
              text="중복확인"
              width="20%"
              handler={checkNicknameDuplication}
              disabled={!isEmailChecked || isEmailDuplicated}
            ></Button>
          </InputWrapper>
          <MsgWrapper show={isNicknameChecked}>
            <Msg show={isNicknameChecked}>
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
            </Msg>
          </MsgWrapper>
          <InputWrapper>
            <Label>PW</Label>
            <Content>
              <Input
                type="password"
                placeholder="패스워드를 입력해 주세요"
                onChange={onChangePassword}
                disabled={!isNicknameChecked || isNicknameDuplicated}
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
                onChange={handlePWChange}
                disabled={!isNicknameChecked || isNicknameDuplicated}
                required
              />
              <ToggleMsg
                text="입력하신 비밀번호가 일치하지 않습니다"
                type="error"
                show={isPWChecked && !isPWSame}
              />
            </Content>
          </InputWrapper>
          <InputWrapper>
            <Label>소개글</Label>
            <Content>
              <Input
                placeholder="소개글을 입력해 주세요(선택)"
                onChange={onChangeDescription}
                disabled={!isNicknameChecked || isNicknameDuplicated}
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
          <Button
            type="main"
            text="가입하기"
            width="180px"
            disabled={!isEmailChecked || !isNicknameChecked || !isPWSame}
            handler={handleSubmit}
          ></Button>
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

const ContentWrapper = styled.div`
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

const MsgWrapper = styled.div`
  width: 100%;
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: row;
  justify-content: flex-end;
`;

const Msg = styled.div`
  width: 85%;
  display: ${(props) => (props.show ? "flex" : "none")};
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
