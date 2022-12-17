import React from "react";
import styled from "styled-components";

import Button from "../components/Button";

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
`;

const WelcomeMsg = styled.span`
  margin-right: 20px;
`;

const Body = styled.div`
  background-color: ${(props) => props.theme.mainColor};
`;

const Layout = React.forwardRef((props, ref) => {
  return (
    <>
      <Header ref={ref}>
        <Logo>🛶 Onpiece</Logo>
        <div>
          <WelcomeMsg>유진님 환영합니다.</WelcomeMsg>
          <Button type="accent" text={`LOGOUT`} />
        </div>
      </Header>
      <Body>{props.children}</Body>
    </>
  );
});

export default Layout;
