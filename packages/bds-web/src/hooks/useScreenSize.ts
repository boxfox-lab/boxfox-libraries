import { isClient, isIOS } from "@boxfox/react-web";
import { orderBy } from "lodash";
import { find, pipe } from "rambda";
import { useEffect, useMemo, useState } from "react";
import { WIDTH_BY_SCREEN } from "../constants/WIDTH_BY_SCREEN";
import { typeSafeEntires, typeSafeFromPairs } from "../utils/typesafe-entires";

export function useScreenSize() {
  const width = useViewportWidth();

  return useMemo(() => {
    const sizes = typeSafeFromPairs(
      typeSafeEntires(WIDTH_BY_SCREEN).map(([name, size]) => [
        name,
        size <= width,
      ])
    );

    const current = pipe(
      () => typeSafeEntires(WIDTH_BY_SCREEN),
      (list) => orderBy(list, ([, size]) => size, "desc"),
      find(([, size]) => size <= width),
      (item) => item?.[0]
    )();

    return { ...sizes, current, size: width };
  }, [width]);
}

function useViewportWidth() {
  const [width, setWidth] = useState(getViewportWidth());

  useEffect(() => {
    const handler = () => setWidth(getViewportWidth());
    const target = isIOS() ? window.visualViewport : window;
    target?.addEventListener("resize", handler);
    target?.addEventListener("load", handler);
    handler();
    return () => {
      target?.removeEventListener("resize", handler);
      target?.removeEventListener("load", handler);
    };
  }, []);

  return width;
}
function getViewportWidth() {
  if (!isClient()) {
    return 0;
  }

  return (
    window.visualViewport?.width ||
    window.outerWidth ||
    window.screen.availWidth
  );
}
