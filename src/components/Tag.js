import React from "react";
import styled from "styled-components";

const Wrapper = styled.span`
  margin-right: 10px;
  padding: 10px;
  border-radius: 15px;
  background-color: ${(props) => props.bgColor};
`;

function Tag({ type, text }) {
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
      case "java":
        bgColor = "#fab1a0";
        break;
      case "javascript":
        bgColor = "#81ecec";
        break;
      case "react":
        bgColor = "#a29bfe";
        break;
      case "spring":
        bgColor = "#fdcb6e";
        break;
      case "node":
        bgColor = "#636e72";
        break;
      default:
        console.log("wrong category type");
        bgColor = "#cccccc";
    }
  }
  return <Wrapper bgColor={bgColor}>{text}</Wrapper>;
}

export default Tag;
