import React, { ComponentType } from "react";
import { ColorNames, useThemeColor } from "../hooks";

export function withThemeColor<P extends { color: string | ColorNames }>(
  Component: ComponentType<P>,
  defaultColor?: string | ColorNames
) {
  return ({
    color,
    ...props
  }: Omit<P, "color"> & { color?: string | ColorNames }) => {
    const colorByTheme = useThemeColor(color ?? defaultColor ?? "gray900");
    const newProps = { ...props, color: colorByTheme } as P;
    return <Component {...newProps} />;
  };
}
