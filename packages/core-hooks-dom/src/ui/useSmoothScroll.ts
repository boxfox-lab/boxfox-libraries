import { RefObject, useCallback, useMemo, useRef } from "react";
import { useSpring } from "react-spring";

export function useSmoothScroll<T extends HTMLElement>(ref?: RefObject<T>) {
  const callbackRef = useRef<() => void>();
  const targetY = useRef<number>();
  const resolve = useCallback(() => {
    callbackRef.current?.();
    targetY.current = undefined;
    callbackRef.current = undefined;
  }, []);

  const [, set] = useSpring(() => ({
    immediate: false,
    y: 0,
    onFrame: (props: { y: number }) => {
      const target = ref?.current ?? window;
      target.scrollTo(0, props.y);
      if (targetY.current != null && Math.abs(targetY.current - props.y) < 24) {
        resolve();
      }
    },
    config: { tension: 150 },
  }));

  const scrollTo = useCallback((y: number) => {
    resolve();
    return new Promise<void>((resolve) => {
      targetY.current = y;
      callbackRef.current = resolve;
      set({ y });
    });
  }, []);

  return useMemo(
    () => ({
      toTop: () => scrollTo(0),
      toBottom: () => {
        const target = ref?.current ?? document.documentElement;
        return scrollTo(target.scrollHeight);
      },
      to: (y: number) => scrollTo(y),
    }),
    [scrollTo]
  );
}
