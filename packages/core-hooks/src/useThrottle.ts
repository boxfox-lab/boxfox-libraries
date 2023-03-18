import throttle from "lodash/throttle";
import { useEffect, useMemo } from "react";
import { useCallbackRef } from "./useCallbackRef";

const options = { leading: true, trailing: false };

export function useThrottle<F extends (...args: any[]) => any>(
  callback: F,
  wait: number
) {
  const callbackRef = useCallbackRef(callback);

  const throttledCallback = useMemo(() => {
    return throttle(callbackRef, wait, options);
  }, [callbackRef, wait]);

  useEffect(
    () => () => {
      throttledCallback.cancel();
    },
    [throttledCallback]
  );

  return throttledCallback;
}
