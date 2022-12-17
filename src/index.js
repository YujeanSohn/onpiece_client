import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import store from "./redux/config/configStore";
import App from "./App";
import "./index.css";

const mainTheme = {
  // colors are referenced from https://flatuicolors.com/palette/us
  mainColor: "#74b9ff",
  subColor: "#fff2cc",
  accentColor: "tomato",
  basicBtnColor: "#ffeaa7",
  cancelBtnColor: "#e17055",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={mainTheme}>
      <App />
    </ThemeProvider>
  </Provider>
);
