import { last, orderBy } from "lodash";
import { map, pipe } from "rambda";
import { useCallback } from "react";
import { typeSafeEntires } from "../utils/typesafe-entires";
import { SCREEN_SIZE, WIDTH_BY_SCREEN } from "../constants/WIDTH_BY_SCREEN";
import { useScreenSize } from "./useScreenSize";

export function useResponsiveValue() {
  const size = useScreenSize();

  const compute = useCallback(
    <T>(values: Partial<Record<SCREEN_SIZE, T>>) => {
      const sorted = pipe(
        () => typeSafeEntires(values),
        map(([name, value]) => [name, value] as const),
        (list) => orderBy(list, ([name]) => WIDTH_BY_SCREEN[name], "desc")
      )();
      const res = sorted.find(([name]) => size[name]) ?? last(sorted);
      return res![1];
    },
    [size]
  );
  return compute;
}
