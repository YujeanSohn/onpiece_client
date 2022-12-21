import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Button from "../components/Button";
import { logout } from "../redux/modules/UserSlice";

const Header = styled.div`
  padding: 40px;
  display: flex;
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

const Body = styled.div`
  background-color: ${(props) => props.theme.mainColor};
`;

const Layout = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    window.location.replace("/login");
  };

  if (window.location.pathname !== "/login") {
    return (
      <>
        <Header ref={ref}>
          <Logo onClick={() => window.location.replace("/")}>🛶 Onpiece</Logo>
          <div>
            <WelcomeMsg>유진님 환영합니다.</WelcomeMsg>
            <Button type="accent" text={`LOGOUT`} handler={handleLogout} />
          </div>
        </Header>
        <Body>{props.children}</Body>
      </>
    );
  } else {
    return <>{props.children}</>;
  }
});

export default Layout;
