import { DependencyList, useCallback, useRef } from "react";

export function useCallbackOnce<F extends (...args: any[]) => void>(
  callback: F,
  deps: DependencyList
) {
  const isCalled = useRef(false);

  return useCallback((...args: Parameters<F>) => {
    if (isCalled.current) {
      return;
    }

    callback(...args);
    isCalled.current = true;
  }, deps);
}
