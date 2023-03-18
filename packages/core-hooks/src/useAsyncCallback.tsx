import { useBooleanState } from "./useBooleanState";
import { DependencyList, useCallback } from "react";

export type AsyncCallback<T extends Array<unknown>, R = void> = {
  callback: (...args: T) => Promise<R>;
  isLoading: boolean;
};

export function useAsyncCallback<T extends Array<unknown>, R>(
  callback: (...args: T) => Promise<R>,
  deps?: DependencyList
): AsyncCallback<T, R> {
  const [isLoading, startLoading, stopLoading] = useBooleanState();
  const wrappedCallback = useCallback(async (...args: T) => {
    startLoading();
    try {
      return await callback(...args);
    } catch (e) {
      throw e;
    } finally {
      stopLoading();
    }
  }, deps ?? [callback]);
  return { callback: wrappedCallback, isLoading };
}
