import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Signin from "../components/Login/Signin";
import Signup from "../components/Login/Signup";
import Promotion from "../components/Login/Promotion";

function Login() {
  const isLogin = useSelector((store) => store.user.isLogin);
  const [showLogin, setShowLogin] = useState(true);

  const handleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin === true) {
      navigate("/");
    }
  }, [isLogin]);

  return (
    <Wrapper>
      <Left>
        <Promotion />
      </Left>
      <Right>
        <Logo>🛶 Onpiece</Logo>
        {showLogin ? (
          <Signin handleChangeForm={handleShowLogin} />
        ) : (
          <Signup handleChangeForm={handleShowLogin} />
        )}
      </Right>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
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

const Right = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const Logo = styled.div`
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: 800;
`;

export default Login;
