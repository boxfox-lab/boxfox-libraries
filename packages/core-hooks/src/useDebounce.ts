import { useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import { useCallbackRef } from "./useCallbackRef";

export function useDebounce<F extends (...args: any[]) => any>(
  callback: F,
  wait: number
) {
  const callbackRef = useCallbackRef(callback);

  const debounced = useMemo(() => {
    return debounce(callbackRef, wait);
  }, [callbackRef, wait]);

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, [debounced]);

  return debounced;
}
