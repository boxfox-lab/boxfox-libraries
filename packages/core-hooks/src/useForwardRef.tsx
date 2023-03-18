import React from "react";

export function useForwardRef<T>(
  forwardedRef: React.ForwardedRef<T>,
  target: T
) {
  if (forwardedRef) {
    typeof forwardedRef === "function"
      ? forwardedRef(target)
      : (forwardedRef.current = target);
  }
}
