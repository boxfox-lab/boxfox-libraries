import { colors } from "@boxfox/bds-common";
import styled from "@emotion/styled";
import React, { ForwardedRef, ReactNode } from "react";
import { PortalConsumer } from "../providers/PortalProvider";
import { Text } from "./Text";

interface Props {
  position: { x: string; y: string };
  children: ReactNode;
}

export const Tooltip = React.forwardRef(function Tooltip(
  { position, children }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <PortalConsumer>
      <Container style={{ left: position.x, top: position.y }} ref={ref}>
        <Text size="sm" color={colors.white}>
          {children}
        </Text>
      </Container>
    </PortalConsumer>
  );
});

const Container = styled.div`
  position: fixed;
  z-index: 16;
  padding: 20px 24px;
  background: #000;
  border-radius: 20px;
  max-width: calc(100vw - 48px);
`;
