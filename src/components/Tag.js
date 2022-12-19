import React from "react";
import styled from "styled-components";

const Wrapper = styled.span`
  margin-right: 10px;
  padding: 10px;
  border-radius: 15px;
  background-color: ${(props) => props.bgColor};
`;

function Tag({ type, text, handler }) {
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
        console.log("wrong level type");
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
        console.log("wrong category type");
        bgColor = "#cccccc";
    }
  }

  let cancel = "";
  if (type === "category") {
    cancel = "X";
  }

  return (
    <Wrapper onClick={handler} bgColor={bgColor}>
      {text} {cancel}
    </Wrapper>
  );
}

export default Tag;
