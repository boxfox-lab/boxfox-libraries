import { colors } from "@boxfox/bds-common";
import styled from "@emotion/styled";
import React, {
  AllHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { TextSize, TextWeight, useTextStyle } from "../../hooks";
import { Spacing } from "../layout";
import { UrlLottie } from "../URLLottie";

type Size =
  | "extraSmall"
  | "small"
  | "medium"
  | "large"
  | "extraLarge"
  | "custom";

type StyleType =
  | "blue"
  | "lightBlue"
  | "light"
  | "dark"
  | "red"
  | "yellow"
  | "green"
  | "gray"
  | "indigo"
  | "lightIndigo"
  | "purple"
  | "lime"
  | "emerald"
  | "cyan"
  | "sky"
  | "pink"
  | "stale";

type Props = Omit<
  AllHTMLAttributes<HTMLButtonElement>,
  "as" | "type" | "size"
> & {
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  type?: StyleType;
  size?: Size;
  loading?: boolean;
  left?: ReactNode;
  right?: ReactNode;
};

export function Button({
  htmlType = "button",
  size = "medium",
  type = "blue",
  loading,
  left,
  right,
  ...props
}: Props) {
  const textStyle = useTextStyle({
    size: TEXT_SIZE_BY_BUTTON_SIZE[size],
    weight: TEXT_WEIGHT_BY_BUTTON_SIZE[size],
    color: "none",
  });
  return (
    <StyledButton
      {...props}
      type={htmlType}
      onClick={!loading ? props.onClick : undefined}
      style={{ ...textStyle, ...props.style }}
      styleType={type}
      size={size}
      loading={loading}
    >
      {right && <Spacing width={4} />}
      {left}
      {loading ? (
        <UrlLottie
          src="https://assets9.lottiefiles.com/packages/lf20_czwfqh7b.json"
          options={{ loop: true, autoplay: true }}
          style={{ width: "22px" }}
        />
      ) : (
        props.children
      )}
      {right}
      {left && <Spacing width={4} />}
    </StyledButton>
  );
}

const PADDING_BY_SIZE: Record<Size, string> = {
  custom: "9px 16px",
  medium: "9px 16px",
  small: "8px 11px",
  large: "11px 24px",
  extraSmall: "7px 11px",
  extraLarge: "12px 20px",
};

const TEXT_SIZE_BY_BUTTON_SIZE: Record<Size, TextSize> = {
  custom: "base",
  medium: "sm",
  small: "sm",
  large: "base",
  extraSmall: "xs",
  extraLarge: "lg",
};

const TEXT_WEIGHT_BY_BUTTON_SIZE: Record<Size, TextWeight> = {
  custom: "bold",
  medium: "bold",
  small: "bold",
  large: "bold",
  extraSmall: "bold",
  extraLarge: "bold",
};

const StyledButton = styled.button<{
  size: Size;
  styleType: StyleType;
  loading?: boolean;
}>`
  ${(p) => (p.loading ? "opacity: 0.9;" : "")}
  padding: ${(p) => PADDING_BY_SIZE[p.size]};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-style: solid;
  ${(p) => {
    const colorSet = getColorSet(p.styleType);
    return `
      color: ${colorSet.color};
      background: ${colorSet.background};
      border-color: ${colorSet.borderColor};
      &:active {
        background: ${colorSet.active.background};
      }
      &:disabled {
        background: ${colorSet.disabled.background};
      }`;
  }}
  &:focus {
    outline: none;
  }
`;

function getColorSet(type: StyleType) {
  switch (type) {
    case "blue":
      return {
        color: colors.white,
        background: colors.blue[600],
        borderColor: colors.gray[200],
        active: { background: colors.gray[200] },
        disabled: { background: colors.gray[300] },
      };
    case "light":
      return {
        color: colors.gray[700],
        background: colors.white,
        borderColor: colors.gray[200],
        active: { background: colors.gray[50] },
        disabled: { background: colors.gray[300] },
      };
    case "dark":
      return {
        color: colors.white,
        background: colors.gray[900],
        borderColor: "rgba(0, 0, 0, 0)",
        active: { background: colors.gray[700] },
        disabled: { background: colors.gray[700] },
      };
    case "gray":
      return {
        color: colors.gray[500],
        background: colors.gray[100],
        borderColor: "rgba(0, 0, 0, 0)",
        active: { background: colors.gray[50] },
        disabled: { background: colors.gray[300] },
      };
    case "lightBlue":
      return {
        color: colors.blue[600],
        background: colors.blue[50],
        borderColor: "rgba(0, 0, 0, 0)",
        active: { background: colors.blue[100] },
        disabled: { background: colors.gray[300] },
      };
    case "lightIndigo":
      return {
        color: colors.indigo[600],
        background: colors.indigo[50],
        borderColor: "rgba(0, 0, 0, 0)",
        active: { background: colors.indigo[100] },
        disabled: { background: colors.gray[300] },
      };
    default:
      return {
        color: colors.white,
        background: colors[type][600],
        borderColor: "rgba(0, 0, 0, 0)",
        active: { background: colors[type][700] },
        disabled: { background: colors.gray[300] },
      };
  }
}
