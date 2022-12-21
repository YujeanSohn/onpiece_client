import React from "react";
import styled from "styled-components";

function Tag({ type, text, isRemovable, handler }) {
  let bgColor = "";
  if (type === "level") {
    switch (text) {
      case "초급":
        bgColor = "#00b894";
        break;
      case "중급":
        bgColor = "#fd79a8";
        break;
      case "고급":
        bgColor = "#6c5ce7";
        break;
      default:
        bgColor = "#cccccc";
    }
  }

  if (type === "category") {
    switch (text) {
      case "JavaScript":
        bgColor = "#fd79a8";
        break;
      case "HTML/CSS":
        bgColor = "#81ecec";
        break;
      case "SQL":
        bgColor = "#00b894";
        break;
      case "Python":
        bgColor = "#00cec9";
        break;
      case "TypeScript":
        bgColor = "#0984e3";
        break;
      case "Java":
        bgColor = "#6c5ce7";
        break;
      case "Bash/Shell":
        bgColor = "#b2bec3";
        break;
      case "C#":
        bgColor = "#dfe6e9";
        break;
      case "C++":
        bgColor = "#ffeaa7";
        break;
      case "PHP":
        bgColor = "#fdcb6e";
        break;
      default:
        bgColor = "#cccccc";
    }
  }

  return (
    <Wrapper bgColor={bgColor}>
      {text}{" "}
      <Btn show={isRemovable} onClick={handler}>
        ✖
      </Btn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  float: left;
  margin: 0 10px 10px 0;
  padding: 10px;
  border-radius: 15px;
  background-color: ${(props) => props.bgColor};
`;

const Btn = styled.button`
  display: ${(props) => (props.show ? "" : "none")};
  border: none;
  background: transparent;
  :hover {
    cursor: pointer;
  }
`;

export default Tag;
