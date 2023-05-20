import React, { HTMLAttributes, memo } from "react";
import { CSSProperties } from "styled-components";
import { coerceCssPixelValue } from "../../utils/coerceCssPixelValue";

type SpacingProps = HTMLAttributes<HTMLDivElement> & {
  children?: never;
} & (
    | { width: string | number }
    | { height: string | number }
    | { flex: CSSProperties["flex"] }
  );

export const Spacing = memo(function Spacing(props: SpacingProps) {
  const { style, ...otherProps } = props;

  return (
    <div
      style={{
        width: "width" in props ? coerceCssPixelValue(props.width) : undefined,
        height:
          "height" in props ? coerceCssPixelValue(props.height) : undefined,
        flex: "flex" in props ? props.flex : "none",
        ...style,
      }}
      {...otherProps}
    />
  );
});
