import { useCallback, useEffect, useRef } from "react";

export function useCallbackRef<Callback extends (...args: any[]) => any>(
  callback: Callback
) {
  const ref = useRef<Callback>(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<Callback>): ReturnType<Callback> => {
      return ref.current(...args);
    },
    [ref]
  );
}
