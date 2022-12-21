import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../components/Button";
import { logout } from "../redux/modules/UserSlice";

const Header = React.forwardRef(({ show }, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Wrapper ref={ref} show={show}>
      <Logo onClick={() => navigate("/")}>🛶 Onpiece</Logo>
      <div>
        <WelcomeMsg>유진님 환영합니다.</WelcomeMsg>
        <Button type="accent" text={`LOGOUT`} handler={handleLogout} />
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  padding: 40px;
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.subColor};
`;

const Logo = styled.h1`
  font-size: 30px;
  font-weight: 800;
  :hover {
    cursor: pointer;
  }
`;

const WelcomeMsg = styled.span`
  margin-right: 20px;
`;

export default Header;
