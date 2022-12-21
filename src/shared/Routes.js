import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Detail from "../pages/Detail";
import PostCreate from "../pages/PostCreate";

const Router = () => {
  const [bodyHeight, setBodyHeight] = useState(0);
  const ref = useRef();
  useEffect(() => {
    if (!ref?.current) return;
    setBodyHeight(window.innerHeight - ref.current.clientHeight);
  }, [ref]);

  return (
    <Layout ref={ref}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home minHeight={bodyHeight} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:id" element={<Detail minHeight={bodyHeight} />} />
          <Route path="/post" element={<PostCreate />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default Router;
