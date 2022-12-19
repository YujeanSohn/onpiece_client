import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Detail from "../pages/Detail";
import PostEditPage from "../pages/PostEditPage";

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post/:id" element={<Detail minHeight={bodyHeight} />} />
          <Route path="/postedit" element={<PostEditPage />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default Router;
