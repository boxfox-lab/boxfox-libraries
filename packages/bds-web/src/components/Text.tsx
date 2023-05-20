import React from "react";
import { ResponsibleTextStyleProps, useTextStyle } from "../hooks/useTextStyle";

type Props<Element extends keyof JSX.IntrinsicElements> = Omit<
  JSX.IntrinsicElements[Element],
  "color"
> &
  ResponsibleTextStyleProps & { as?: Element };

export function Text<T extends keyof JSX.IntrinsicElements = "div">({
  size,
  weight,
  color,
  center,
  as,
  ...props
}: Props<T>) {
  const style = useTextStyle({ size, weight, color, center });
  const Element = (as ?? "div") as any;
  return <Element {...props} style={{ ...style, ...props.style }} />;
}
