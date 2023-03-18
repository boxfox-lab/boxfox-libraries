/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { useColors } from "./useColors";
import { colors } from "../constants/colors";
import useColorScheme from "./useColorScheme";

export type ColorNames = keyof typeof colors.light | keyof typeof colors.dark;
export function useThemeColor(colorName: ColorNames): string;
export function useThemeColor(color: string): string;
export function useThemeColor(props: { light: string; dark: string }): string;
export function useThemeColor(
  prop: { light: string; dark: string } | ColorNames | string
) {
  const colors = useColors();
  const theme = useColorScheme();
  if (typeof prop !== "string") {
    return colors;
  } else if (checkIsColorNames(prop)) {
    return colors[prop];
  }
  return getColorsOfTheme(prop)[theme];
}

function getColorsOfTheme(color: string | ColorNames) {
  if (checkIsColorNames(color)) {
    return { light: colors.light[color], dark: colors.dark[color] };
  }
  const key = getColorNameByColor(color);
  if (key) {
    return { light: colors.light[key], dark: colors.dark[key] };
  }
  return { light: color, dark: color };
}

function checkIsColorNames(color: string | ColorNames): color is ColorNames {
  return Object.keys(colors.light).includes(color);
}

function getColorNameByColor(color: string): ColorNames | undefined {
  const key = Object.entries(colors.light).find(
    ([_, value]) => value === color
  )?.[0];
  return key as ColorNames | undefined;
}
