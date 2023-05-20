import { colors } from "@boxfox/bds-common";
import styled from "@emotion/styled";
import { CSSProperties } from "react";
import { coerceCssPixelValue } from "../utils";

export const Divider = styled.div<{
  height?: CSSProperties["height"];
  width?: CSSProperties["width"];
  color?: CSSProperties["backgroundColor"];
  marginHorizontal?: CSSProperties["marginTop"];
  marginVertical?: CSSProperties["marginLeft"];
}>`
  width: ${(p) => coerceCssPixelValue(p.width ?? "1px")};
  height: ${(p) => coerceCssPixelValue(p.height ?? "1px")};
  background-color: ${(p) => p.color ?? colors.gray[100]};
  ${(p) =>
    p.marginVertical
      ? `
    margin-top: ${coerceCssPixelValue(p.marginVertical)};
    margin-bottom: ${coerceCssPixelValue(p.marginVertical)};
  `
      : ""};
  ${(p) =>
    p.marginHorizontal
      ? `
    margin-left: ${coerceCssPixelValue(p.marginHorizontal)};
    margin-right: ${coerceCssPixelValue(p.marginHorizontal)};
  `
      : ""};
`;
