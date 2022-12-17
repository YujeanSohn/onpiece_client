import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  padding: 10px 20px;
  width: ${(props) => props.width};
  border: none;
  border-radius: 5px;
  background-color: ${(props) => {
    switch (props.type) {
      case "accent":
        return props.theme.accentColor;
      case "cancel":
        return props.theme.cancelBtnColor;
      default:
        return props.theme.basicBtnColor;
    }
  }};
  color: ${(props) => props.color};
`;

function Button({ width, type, text = "button", handler }) {
  return (
    <Wrapper onClick={handler} width={width} type={type}>
      {text}
    </Wrapper>
  );
}

export default Button;
