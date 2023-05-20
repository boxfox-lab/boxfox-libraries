/** @jsx jsx */
import { css, jsx, SerializedStyles } from "@emotion/react";
import React, { CSSProperties, ReactNode } from "react";

interface FlexOptions {
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  direction?: CSSProperties["flexDirection"];
}

export function flex(options: FlexOptions): SerializedStyles;
export function flex(
  align: string,
  justify?: CSSProperties["justifyContent"],
  direction?: CSSProperties["flexDirection"]
): SerializedStyles;
export function flex(
  alignOrFlexOptions: FlexOptions | string,
  justify = "flex-start",
  direction = "row"
) {
  if (typeof alignOrFlexOptions === "object") {
    const {
      align = "flex-start",
      direction = "row",
      justify = "flex-start",
    } = alignOrFlexOptions;

    return css`
      align-items: ${align};
      display: flex;
      flex-direction: ${direction};
      justify-content: ${justify};
    `;
  }

  return css`
    align-items: ${alignOrFlexOptions};
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
  `;
}

type FlexProps<Element extends keyof JSX.IntrinsicElements = "div"> =
  JSX.IntrinsicElements[Element] & FlexOptions & { as?: Element | ReactNode };

const FlexContainer = React.forwardRef(function Flex(
  {
    align = "flex-start",
    as = "div",
    direction = "row",
    justify = "flex-start",
    ...props
  }: FlexProps,
  ref
) {
  const Component = as as any;

  return (
    <Component css={flex({ align, direction, justify })} {...props} ref={ref} />
  );
});

export const Flex = {
  Center: React.forwardRef((props: FlexProps, ref) => (
    <FlexContainer align="center" justify="center" {...props} ref={ref} />
  )),
  CenterVertical: React.forwardRef((props: FlexProps, ref) => (
    <FlexContainer align="center" {...props} ref={ref} />
  )),
  CenterHorizontal: React.forwardRef((props: FlexProps, ref) => (
    <FlexContainer justify="center" {...props} ref={ref} />
  )),
};
