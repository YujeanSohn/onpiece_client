import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Post from "../components/Post";
import { useSelector } from "react-redux";

function LoginPage() {
  const posts = useSelector((store) => store.posts.posts);

  const [show, setShow] = useState(true);
  const toggle = () => {
    setShow(!show);
  };

  return (
    <Container>
      <Left>
        <Title>
          <First>너👇 내 온라인 코딩스터디 동료가 되라!</First>
          <Second>온피스에서 코딩스터디모집을 간편하게 시작해보세요.</Second>
          <Offer>현재 진행중인 스터디를 구경해보세요🙏</Offer>
        </Title>
        <Card>
          {posts.map((post) => (
            <Post key={post.postId} post={post} width={40} />
          ))}
        </Card>
      </Left>
      <Right>
        {show && (
          <form>
            <Logo>🛶 Onpiece</Logo>
            <LoginForm>
              <IDPW>
                ID
                <IdInput
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  required
                ></IdInput>
              </IDPW>
              <IDPW>
                PW
                <PWInput
                  type="password"
                  placeholder="패스워드를 입력해 주세요"
                  required
                ></PWInput>
              </IDPW>
            </LoginForm>
            <ButtonBox>
              <Button
                type="default"
                text="회원가입"
                width="180px"
                handler={toggle}
              ></Button>
              <Button type="main" text="로그인" width="180px" />
            </ButtonBox>
          </form>
        )}
        {!show && (
          <form>
            <Logo>🛶 Onpiece</Logo>
            <RegisterForm>
              <InputWrapper>
                <Label>ID</Label>
                <Content>
                  <Register
                    type="email"
                    placeholder="아이디를 입력해 주세요"
                    required
                  ></Register>
                  <Button type="default" text="중복확인" width="94px"></Button>
                </Content>
              </InputWrapper>
              <InputWrapper>
                <Label>닉네임</Label>
                <Content>
                  <Register
                    placeholder="닉네임을 입력해 주세요"
                    required
                  ></Register>
                  <Button type="default" text="중복확인" width="94px"></Button>
                </Content>
              </InputWrapper>
              <InputWrapper>
                <Label>PW</Label>
                <Content>
                  <Register
                    type="password"
                    placeholder="패스워드를 입력해 주세요"
                  ></Register>
                </Content>
              </InputWrapper>
              <InputWrapper>
                <Label>PW CHECK</Label>
                <Content>
                  <Register
                    type="password"
                    placeholder="패스워드를 한번 더 입력해 주세요"
                  ></Register>
                </Content>
              </InputWrapper>
              <InputWrapper>
                <Label>소개글</Label>
                <Content>
                  <Register placeholder="소개글을 입력해 주세요(선택)"></Register>
                </Content>
              </InputWrapper>
            </RegisterForm>
            <ButtonBox>
              <Button
                type="default"
                text="뒤로가기"
                width="180px"
                handler={toggle}
              />
              <Button type="main" text="가입하기" width="180px" />
            </ButtonBox>
          </form>
        )}
      </Right>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 120vh;
  display: flex;
`;

const Left = styled.div`
  width: 50%;
  height: 100%;

  @media screen and (max-width: 1000px) {
    display: none;
  }
  background-color: ${(props) => props.theme.mainColor}; ;
`;

const Title = styled.div`
  margin-top: 100px;
  text-align: center;
`;

const First = styled.div`
  font-size: 30px;
`;

const Second = styled.div`
  margin-top: 20px;
  font-size: 25px;
`;

const Offer = styled.div`
  margin-top: 50px;
  margin-left: 30px;
  font-size: 20px;
  display: inline-block;
`;

const Card = styled.div`
  width: (100%-40px);
  height: 60vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-top: 40px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Right = styled.div`
  width: 50%;
  height: 100%;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-top: 200px;
  font-size: 30px;
  font-weight: 800;
  @media screen and (max-width: 499px) {
    margin-top: 50%;
    margin-left: 50px;
  }
`;

const LoginForm = styled.div`
  border-radius: 10px;
  background-color: #74b9ff;
  width: 450px;
  height: 250px;
  margin: auto;
  margin-top: 50px;
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

const IdInput = styled.input`
  border: white;
  width: 300px;
  height: 50px;
  margin-left: 30px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  text-indent: 10px;
`;

const PWInput = styled.input`
  border: white;
  width: 300px;
  height: 50px;
  margin-top: 30px;
  margin-left: 20px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  text-indent: 10px;
`;

const ButtonBox = styled.div`
  width: 45%;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const IDPW = styled.label`
  font-size: 20px;
  margin-left: 40px;
`;

const RegisterForm = styled.div`
  border-radius: 10px;
  background-color: #74b9ff;
  width: 500px;
  margin: auto;
  margin-top: 50px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
`;

const Register = styled.input`
  border: white;
  width: 300px;
  height: 50px;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  text-indent: 10px;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Label = styled.div`
  font-size: 15px;
  width: 15%;
  line-height: 50px;
`;

const Content = styled.div`
  width: 85%;
`;

export default LoginPage;
