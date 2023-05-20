import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { TextStyleProps } from "../hooks";
import { CSSProperties } from "styled-components";

interface State {
  fontFamily?: (props: TextStyleProps) => string | undefined;
  fontWeight?: (props: TextStyleProps) => CSSProperties["fontWeight"];
  fontSize?: (props: TextStyleProps) => CSSProperties["fontSize"];
  lineHeight?: (props: TextStyleProps) => CSSProperties["lineHeight"];
}

export const FontContext = createContext<State | null>(null);

interface Props extends State {
  children: ReactNode;
}

export function FontProvider({
  children,
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
}: Props) {
  const value = useMemo(
    () => ({ fontWeight, fontFamily, fontSize, lineHeight }),
    [fontWeight, fontFamily, fontSize, lineHeight]
  );
  return <FontContext.Provider value={value}>{children}</FontContext.Provider>;
}

export function useFontContext() {
  const context = useContext(FontContext);
  return context;
}
