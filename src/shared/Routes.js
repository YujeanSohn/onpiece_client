import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Layout from "./Layout";

const Router = () => {
  const [bodyHeight, setBodyHeight] = useState(0);
  const ref = useRef();
  useEffect(() => {
    if (!ref?.current) return;
    setBodyHeight(window.innerHeight - ref.current.clientHeight);
  }, [ref, window]);
  return (
    <>
      <Layout ref={ref}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home minHeight={bodyHeight} />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </>
  );
};

export default Router;
