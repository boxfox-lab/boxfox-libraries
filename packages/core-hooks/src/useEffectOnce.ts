import { DependencyList, useEffect, useRef } from "react";

export function useEffectOnce<F extends (...args: any[]) => void>(
  callback: F,
  deps: DependencyList
) {
  const hasFired = useRef(false);
  return useEffect((...args: Parameters<F>) => {
    if (hasFired.current) {
      return;
    }

    callback(...args);
    hasFired.current = true;
  }, deps);
}
