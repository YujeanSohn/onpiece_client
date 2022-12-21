import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Detail from "../pages/Detail";
import PostCreate from "../pages/PostCreate";
import User from "../pages/User";

const Router = () => {
  const [bodyHeight, setBodyHeight] = useState(0);
  const ref = useRef();
  useEffect(() => {
    if (!ref?.current) return;
    if (window.innerHeight === 0) return;
    setBodyHeight(window.innerHeight - ref.current.clientHeight);
  }, [window.innerHeight, ref]);

  const isLogin = useSelector((store) => store.user.isLogin);

  return (
    <BrowserRouter>
      {isLogin ? <Header ref={ref} /> : <></>}
      <Routes>
        <Route path="/" element={<Home minHeight={bodyHeight} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<Detail minHeight={bodyHeight} />} />
        <Route path="/post" element={<PostCreate />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
