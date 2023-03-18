import * as React from "react";
import styled from "styled-components/native";

export function DotLine({
  dotLineColor,
  backgroundColor,
}: {
  dotLineColor?: string;
  backgroundColor?: string;
}) {
  return (
    <DotLineContainer dotLineColor={dotLineColor}>
      <StyledDotLine backgroundColor={backgroundColor} />
    </DotLineContainer>
  );
}
const DotLineContainer = styled.View<{ dotLineColor?: string }>`
  height: 1px;
  flex-grow: 1;
  border-radius: 1px;
  border-width: 1px;
  border-color: ${(p) => p.dotLineColor ?? p.theme.colors.gray200};
  border-style: dashed;
  z-index: 0;
  margin: 0 12px;
`;

const StyledDotLine = styled.View<{ backgroundColor?: string }>`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  ${(p) => (p.backgroundColor ? `background: ${p.backgroundColor};` : "")}
  z-index: 1;
`;
