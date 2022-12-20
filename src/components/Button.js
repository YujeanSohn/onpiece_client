import React from "react";
import styled from "styled-components";

const Button = ({ size, width, type, text = "button", handler, disabled }) => {
  return (
    <Wrapper
      size={size}
      width={width}
      type={disabled ? "disabled" : type}
      onClick={handler}
      disabled={disabled}
    >
      {text}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  padding: ${(props) => {
    switch (props.size) {
      case "small":
        return `5px 10px`;
      case "midium":
        return `10px 20px`;
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
      case "main":
        return props.theme.mainColor;
      case "default":
        return props.theme.basicBtnColor;
      case "disabled":
        return props.theme.disabledBtnColor;
      default:
        return props.theme.basicBtnColor;
    }
  }};
  :hover {
    cursor: pointer;
  }
`;

export default Button;
