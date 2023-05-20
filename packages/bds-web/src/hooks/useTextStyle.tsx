import { colors } from "@boxfox/bds-common";
import { CSSProperties, useMemo } from "react";
import { WIDTH_BY_SCREEN } from "../constants/WIDTH_BY_SCREEN";
import { useResponsiveValue } from "./useResponsiveValue";
import { useFontContext } from "../providers/FontProvider";

export const DEFAULT_TEXT_SIZE: TextSize = "base";
export const DEFAULT_TEXT_WEIGHT = "regular";
export const DEFAULT_TEXT_COLOR = colors.gray[900];

type Responsible<T> = Partial<Record<keyof typeof WIDTH_BY_SCREEN, T>>;

export interface TextStyleProps {
  size?: TextSize;
  weight?: TextWeight;
  color?: string;
  center?: boolean;
}

export interface ResponsibleTextStyleProps {
  size?: TextSize | Responsible<TextSize>;
  weight?: TextWeight | Responsible<TextWeight>;
  color?: string | Responsible<string>;
  center?: boolean | Responsible<boolean>;
}

const FRONT_FONT_WEIGHT: Record<TextWeight, CSSProperties["fontWeight"]> = {
  extrabold: 800,
  bold: 700,
  semibold: 600,
  medium: 500,
  regular: "normal",
};

function getFontWeight({ weight }: TextStyleProps) {
  if (!weight) {
    return "normal";
  }
  return FRONT_FONT_WEIGHT[weight];
}

export function useTextStyle(props: ResponsibleTextStyleProps): CSSProperties {
  const compute = useResponsiveValue();
  const context = useFontContext();

  return useMemo(() => {
    const size = props.size ?? DEFAULT_TEXT_SIZE;

    const computed = {
      size: getValue(size, compute),
      weight: getValue(props.weight, compute),
      color: getValue(props.color, compute),
      center: getValue(props.center, compute),
    };

    const fontSize = (context?.fontSize ?? getFontSize)(computed);
    const lineHeight = (context?.lineHeight ?? getLineHeight)(computed);
    const color = computed.color ?? DEFAULT_TEXT_COLOR;
    const letterSpacing = props.size === "p1" ? -0.41 : -0.1;
    const textAlign = props.center ? "center" : undefined;
    const fontWeight = (context?.fontWeight ?? getFontWeight)(computed);

    return {
      fontSize,
      lineHeight,
      fontFamily: "Pretendard",
      color,
      letterSpacing,
      textAlign,
      fontWeight,
    };
  }, [props.size, props.weight, props.color, props.center, compute, context]);
}

export type TextSize =
  | "xxxs"
  | "xxs"
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "p1";

export type TextWeight =
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";

export const getFontSize = ({
  size,
}: TextStyleProps): CSSProperties["fontSize"] => {
  if (size === "xxxs") return "11px";
  if (size === "xxs") return "12px";
  if (size === "xs") return "14px";
  if (size === "sm") return "15px";
  if (size === "base") return "16px";
  if (size === "lg") return "18px";
  if (size === "xl") return "21px";
  if (size === "2xl") return "23px";
  if (size === "3xl") return "26px";
  if (size === "4xl") return "30px";
  if (size === "5xl") return "38px";
  if (size === "6xl") return "46px";
  if (size === "p1") return "16px";
  return 0;
};

export const getLineHeight = ({
  size,
}: TextStyleProps): CSSProperties["lineHeight"] => {
  if (size === "xxxs") return "14px";
  if (size === "xxs") return "16px";
  if (size === "xs") return "20px";
  if (size === "sm") return "22px";
  if (size === "base") return "23px";
  if (size === "lg") return "27px";
  if (size === "xl") return "30px";
  if (size === "2xl") return "32.1px";
  if (size === "3xl") return "37px";
  if (size === "4xl") return "40px";
  if (size === "5xl") return "45px";
  if (size === "6xl") return "52px";
  if (size === "p1") return "27px";
  return 0;
};

export const getFontFamily = ({ size, weight }: TextStyleProps) => {
  if (size === "p1") return "IBMPlexSansKR-Regular";
  if (weight === "regular") return "Pretendard-Regular";
  if (weight === "medium") return "Pretendard-Medium";
  if (weight === "semibold") return "Pretendard-SemiBold";
  if (weight === "bold") return "Pretendard-Bold";
  if (weight === "extrabold") return "Pretendard-ExtraBold";
};

function getValue<T extends string | number | undefined | boolean>(
  value: T | Responsible<T>,
  compute: ReturnType<typeof useResponsiveValue>
): T | undefined {
  if (typeof value !== "object") {
    return value;
  }
  return compute(value);
}
