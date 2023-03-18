import { useEffect } from "react";
import { useCallbackRef } from "@boxfox/core-hooks";

export function useOnMouseDown(handler: (e: MouseEvent) => void) {
  const preservedHandler = useCallbackRef(handler);
  useEffect(() => {
    document.addEventListener("mousedown", preservedHandler);
    return () => {
      document.removeEventListener("mousedown", preservedHandler);
    };
  }, [preservedHandler]);
}
