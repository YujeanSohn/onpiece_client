import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";

import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Layout from "./Layout";

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
            <Route
              path="/post/:id"
              element={<Detail minHeight={bodyHeight} />}
            />
          </Routes>
        </BrowserRouter>
      </Layout>
  );
};

export default Router;
