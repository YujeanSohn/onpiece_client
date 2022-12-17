import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: ${(props) => props.width};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BarWrapper = styled.div`
  float: left;
  position: relative;
  width: 80%;
  height: 15px;
  border: 1px solid black;
  background-color: white;
`;

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.percentage};
  height: 15px;
  background-color: ${(props) => props.theme.accentColor};
`;

const Info = styled.div`
  width: 10%;
  font-size: 12px;
  font-weight: 600;
`;

function Progressbar({ width = 100, denominator, numerator }) {
  const percentage = Math.trunc((numerator / denominator) * 100);
  return (
    <Wrapper width={`${width}%`}>
      <BarWrapper>
        <Bar percentage={`${percentage}%`}></Bar>
      </BarWrapper>
      <Info>{`${numerator}/${denominator}`}</Info>
    </Wrapper>
  );
}

export default Progressbar;
