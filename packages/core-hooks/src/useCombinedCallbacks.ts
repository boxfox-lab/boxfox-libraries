import { useCallback } from "react";

export function useCombinedCallbacks<T>(
  ...callbacks: Array<undefined | ((param: T) => void)>
) {
  return useCallback(combineCallbacks(...callbacks), callbacks);
}

export function combineCallbacks<T>(
  ...callbacks: Array<undefined | ((param: T) => void)>
) {
  return (param: T) => {
    for (const callback of callbacks) {
      callback?.(param);
    }
  };
}
