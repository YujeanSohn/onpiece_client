import React from "react";
import styled from "styled-components";

function ToggleMsg({ text, type, show }) {
  return (
    <Msg show={show} type={type}>
      {text}
    </Msg>
  );
}

const Msg = styled.p`
  margin-top: 10px;
  width: 100%;
  display: ${(props) => (props.show ? "" : "none")};
  font-size: 12px;
  font-weight: 800;
  color: ${(props) => {
    switch (props.type) {
      case "error":
        return props.theme.accentColor;
      case "success":
        return "blue";
      default:
        return "black";
    }
  }};
`;

export default ToggleMsg;
