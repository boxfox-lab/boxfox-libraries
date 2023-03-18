import { useEffect, useRef } from "react";
import { useCallbackRef } from "@boxfox/core-hooks";

export function useOnTouchSlide<T extends HTMLElement>(
  onScroll: (e: TouchEvent) => void,
  offset: number = 10
) {
  const targetRef = useRef<T>(null);
  const draggingStart = useRef<null | number>(null);
  const preservedOnScroll = useCallbackRef(onScroll);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (
        e.target === targetRef.current ||
        targetRef.current?.contains(e.target as Node)
      ) {
        draggingStart.current = e.touches.item(0)?.screenY ?? null;
      }
    };
    const handleTouchEnd = () => {
      draggingStart.current = null;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const y = e.touches.item(0)?.screenY ?? null;
      if (
        y &&
        draggingStart.current &&
        Math.abs(y - draggingStart.current) > offset
      ) {
        preservedOnScroll(e);
      }
    };
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchmove", handleTouchMove);
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      document.addEventListener("touchmove", handleTouchMove);
    };
  }, [preservedOnScroll]);

  return targetRef;
}
