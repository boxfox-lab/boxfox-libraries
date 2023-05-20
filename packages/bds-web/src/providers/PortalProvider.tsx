import styled from "@emotion/styled";
import React, { createContext, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { inDesktop } from "../utils";

export const PortalContext = createContext<HTMLDivElement | null>(null);

export function PortalProvider({
  children,
  zIndex = 1,
}: {
  children: ReactNode;
  zIndex?: number;
}) {
  const [portalContainerRef, setPortalContainerRef] =
    useState<HTMLDivElement | null>(null);

  return (
    <PortalContext.Provider value={portalContainerRef}>
      {children}
      <Container
        id="portal-container"
        zIndex={zIndex}
        ref={(el) => {
          if (portalContainerRef !== null || el === null) {
            return;
          }

          setPortalContainerRef(el);
        }}
      />
    </PortalContext.Provider>
  );
}

const Container = styled.div<{ zIndex: number }>`
  z-index: ${(p) => p.zIndex};
  ${inDesktop(`
    position: fixed;
    bottom: 0;
    max-width: 375px;
    width: 100%;
  `)}
`;

export function PortalConsumer({ children }: { children: ReactNode }) {
  return (
    <PortalContext.Consumer>
      {(portalContainerRef) => {
        if (portalContainerRef === null) {
          return null;
        }

        return createPortal(children, portalContainerRef);
      }}
    </PortalContext.Consumer>
  );
}
