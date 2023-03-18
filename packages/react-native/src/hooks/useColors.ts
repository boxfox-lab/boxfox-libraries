import { useMemo } from "react";
import { colors } from "../constants/colors";
import { useColorSchemeInContext } from "@boxfox/bds-common";
import useColorScheme from "./useColorScheme";

export function useColors() {
  const context = useColorSchemeInContext();
  const theme = useColorScheme();
  return useMemo(
    () => ({
      ...colors[theme],
      primary: context?.primary ?? colors.light.green,
    }),
    [context?.primary, theme]
  );
}
