import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../components/Button";
import { logout, __getUserInfo } from "../redux/modules/UserSlice";

const Header = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.user.userInfo);
  const userId = !userInfo?.userId
    ? localStorage.getItem("userId")
    : userInfo.userId;
  useEffect(() => {
    if (!userInfo?.nickname) dispatch(__getUserInfo(userId));
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Wrapper ref={ref}>
      <Logo onClick={() => navigate("/")}>🛶 Onpiece</Logo>
      <div>
        <WelcomeMsg>
          <Link to={`/user/${userId}`}>{userInfo?.nickname}</Link>님 환영합니다.
        </WelcomeMsg>
        <Button type="accent" text={`LOGOUT`} handler={handleLogout} />
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
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

export default Header;
