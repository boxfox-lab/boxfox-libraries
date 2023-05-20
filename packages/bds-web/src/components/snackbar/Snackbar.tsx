import { colors } from "@boxfox/bds-common";
import styled from "@emotion/styled";
import React, { ReactNode, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import { PortalConsumer } from "../../providers/PortalProvider";

interface Props {
  open?: boolean;
  onClose?: () => void;
  children: ReactNode;
  type?: "light" | "dark";
}

export function Snackbar({ open, onClose, children, type = "light" }: Props) {
  useEffect(() => {
    if (!open) {
      return;
    }
    const timeout = setTimeout(() => onClose?.(), 3000);
    return () => clearTimeout(timeout);
  }, [open, onClose]);

  const spring = useSpring({
    bottom: open ? 64 : -64,
    opacity: open ? 1 : 0,
  });

  return (
    <PortalConsumer>
      <SnackbarContainer type={type} style={spring}>
        {children}
      </SnackbarContainer>
    </PortalConsumer>
  );
}

const SnackbarContainer = styled(animated.div)<{ type: "light" | "dark" }>`
  background: ${(p) => (p.type === "light" ? colors.white : colors.gray[900])};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  text-align: center;
  border-radius: 8px;
  padding: 12px 16px;
  position: fixed;
  z-index: 15;
  left: 50%;
  transform: translateX(-50%);
`;
