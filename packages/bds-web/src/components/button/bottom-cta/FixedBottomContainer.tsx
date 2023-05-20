import styled from "@emotion/styled";
import React, { ComponentProps, ReactNode, useState } from "react";
import { PortalConsumer } from "../../../providers/PortalProvider";
import { inDesktop } from "../../../utils";
import useFixedBottomStyle from "./useFixedBottomStyle";

interface Props extends ComponentProps<typeof FixedContainer> {
  background?: boolean | "gradient" | "solid";
  children: ReactNode;
  takeSpace?: boolean;
  hideWhenKeyboardOpen?: boolean;
}
export function FixedBottomContainer({
  background,
  children,
  takeSpace,
  hideWhenKeyboardOpen,
  ...props
}: Props) {
  const style = useFixedBottomStyle(hideWhenKeyboardOpen);
  const [height, setHeight] = useState(0);

  return (
    <>
      {takeSpace && <Space style={{ height: `${height}px` }} />}
      <PortalConsumer>
        <FixedContainer
          {...props}
          style={{ ...props.style, ...style }}
          ref={(el) => setHeight(el?.clientHeight ?? 0)}
        >
          {(background === true || background === "gradient") && <Gradient />}
          {background === "solid" && <Solid />}
          <ContentContainer background={Boolean(background)}>
            {children}
          </ContentContainer>
        </FixedContainer>
      </PortalConsumer>
    </>
  );
}

const Space = styled.div`
  width: 100%;
`;

const FixedContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: -1px;
  width: 100vw;
  ${inDesktop(`
    position: absolute;
  `)};
`;

const ContentContainer = styled.div<{ background?: boolean }>`
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  display: flex;
  align-items: center;
  justify-content: center;
  & > button {
    width: 100%;
  }
  ${(p) => p.background && `background-color: rgba(255, 255, 255, 0.99);`}
`;

const Solid = styled.div`
  width: 100%;
  height: 16px;
  background-color: rgba(255, 255, 255, 0.99);
`;

const Gradient = styled.div`
  width: 100%;
  height: 32px;
  display: block;
  background: linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0));
`;
