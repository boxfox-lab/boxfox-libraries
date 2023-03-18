import { Ref, useCallback, MutableRefObject, RefCallback } from "react";

export function useCombinedRefs<T>(
  ...refs: Array<Ref<T> | RefCallback<T> | undefined>
): (value: T) => void {
  return useCallback(combineRefs(...refs), [refs]);
}

export function combineRefs<T>(
  ...refs: Array<Ref<T> | RefCallback<T> | undefined>
) {
  return (value: T) => {
    for (const ref of refs.filter((ref) => ref != null)) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<T>).current = value;
      }
    }
  };
}
