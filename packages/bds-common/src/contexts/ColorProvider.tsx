import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { ColorSet } from "../constants";

export type ColorSchemeName = "light" | "dark" | null | undefined;

interface ContextState {
  scheme?: ColorSchemeName;
  primary?: ColorSet;
}

const Context = createContext<ContextState | undefined>(undefined);
interface Props {
  children: ReactNode;
  scheme?: ColorSchemeName;
  primary?: ColorSet;
}

export function ColorProvider(props: Props) {
  const value = useMemo(
    () => ({ scheme: props.scheme, primary: props.primary }),
    [props.scheme, props.primary]
  );
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

export function useColorSchemeInContext() {
  return useContext(Context);
}
