import { TextStyle } from "react-native";
import { useFontContext } from "../contexts";
import { useThemeColor } from "../hooks/useThemeColor";

export type TextSize =
  | "xxs"
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "p1";

export type TextWeight =
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";

export const getDefaultFontSize = (size: TextSize) => {
  if (size === "xxs") return 13;
  if (size === "xs") return 14;
  if (size === "sm") return 15;
  if (size === "base") return 16;
  if (size === "lg") return 18;
  if (size === "xl") return 20;
  if (size === "2xl") return 23;
  if (size === "3xl") return 28;
  if (size === "p1") return 16;
};

export const getLineHeight = (size: TextSize) => {
  if (size === "xxs") return 18;
  if (size === "xs") return 20;
  if (size === "sm") return 22;
  if (size === "base") return 23;
  if (size === "lg") return 28;
  if (size === "xl") return 28;
  if (size === "2xl") return 32;
  if (size === "3xl") return 38;
  if (size === "p1") return 28;
};

export const getDefaultFontFamily = ({ weight }: TextStyleProps) => {
  if (weight === "regular") return "Pretendard-Regular";
  if (weight === "medium") return "Pretendard-Medium";
  if (weight === "semibold") return "Pretendard-SemiBold";
  if (weight === "bold") return "Pretendard-Bold";
  if (weight === "extrabold") return "Pretendard-ExtraBold";
};

export interface TextStyleProps {
  size?: TextSize;
  weight?: TextWeight;
  color?: string;
  center?: boolean;
}

export function useTextStyle(props: TextStyleProps): TextStyle {
  const { size = "base", color: rawColor = "gray900", center } = props;
  const context = useFontContext();
  const getFontFamily = context?.fontFamily ?? getDefaultFontFamily;
  const getFontSize = context?.fontSize ?? getDefaultFontSize;
  const fontSize = getFontSize(size);
  const fontFamily = getFontFamily({ ...props, size });
  const color = useThemeColor(rawColor);
  const textAlign = center ? "center" : undefined;
  return { color, fontSize, fontFamily, textAlign };
}
