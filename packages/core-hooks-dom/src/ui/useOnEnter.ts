import { useCallback, useEffect } from "react";
import { useCallbackRef } from "@boxfox/core-hooks";

export function useOnEnter(onEnter: (e: KeyboardEvent) => void) {
  const preservedOnEnter = useCallbackRef(onEnter);
  const handler = useCallback((e: KeyboardEvent) => {
    if (isEnter(e)) {
      preservedOnEnter(e);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handler, true);
    return () => {
      document.removeEventListener("keydown", handler, true);
    };
  }, [handler]);
}

function isEnter(e: KeyboardEvent) {
  return e.key?.toLocaleLowerCase() === "enter" && !e.shiftKey;
}
