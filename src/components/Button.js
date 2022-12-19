import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  padding: ${(props) => {
    switch (props.size) {
      case "small":
        return `5px 10px`;
      case "midium":
        return `10px 20px`;
      case "large":
        return `10px 50px`;
      case "x-large":
        return ``;
      default:
        return `10px 20px`;
    }
  }};
  width: ${(props) => props.width};
  border: none;
  border-radius: 5px;
  background-color: ${(props) => {
    switch (props.type) {
      case "accent":
        return props.theme.accentColor;
      case "cancel":
        return props.theme.cancelBtnColor;
      case "login":
        return props.theme.mainColor;
      default:
        return props.theme.basicBtnColor;
    }
  }};
  color: ${(props) => props.color};
  :hover {
    cursor: pointer;
  }
`;

const Button = ({ size, width, type, text = "button", handler }) => {
  return (
    <Wrapper size={size} width={width} type={type} onClick={handler}>
      {text}
    </Wrapper>
  );
};
export default Button;
