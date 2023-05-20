import styled from "@emotion/styled";
import React, { ComponentProps, ReactNode } from "react";
import { Spacing } from "../../layout";
import { Button } from "../Button";
import { FixedBottomContainer } from "./FixedBottomContainer";

interface Props extends ComponentProps<typeof Button> {
  background?: boolean;
  takeSpace?: boolean;
  accessory?: ReactNode;
  hideWhenKeyboardOpen?: boolean;
}

export function FixedBottomCTA({
  background,
  takeSpace,
  accessory,
  hideWhenKeyboardOpen,
  ...props
}: Props) {
  return (
    <FixedBottomContainer
      background={background}
      takeSpace={takeSpace}
      hideWhenKeyboardOpen={hideWhenKeyboardOpen}
    >
      <Container>
        {accessory && (
          <>
            {accessory}
            <Spacing height={8} />
          </>
        )}
        <Button size="large" {...props} />
      </Container>
    </FixedBottomContainer>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 0 16px;
  & > * {
    width: 100%;
  }
`;
