import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { TextStyleProps } from "../constants/text-style";

interface State {
  fontFamily?: (props: TextStyleProps) => string;
  fontWeight?: (props: TextStyleProps) => number;
  fontSize?: (props: TextStyleProps) => number;
  lineHeight?: (props: TextStyleProps) => number;
}

export const FontContext = createContext<State | null>(null);

interface Props {
  fontFamily?: (props: TextStyleProps) => string;
  fontWeight?: (props: TextStyleProps) => number;
  fontSize?: (props: TextStyleProps) => number;
  lineHeight?: (props: TextStyleProps) => number;
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
