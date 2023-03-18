import { useEffect, useCallback } from "react";

export function useVisibilityEvent(
  callback: (visibilityState: VisibilityState) => void
) {
  const handleVisibilityChange = useCallback(() => {
    callback(document.visibilityState);
  }, [callback]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);
}
