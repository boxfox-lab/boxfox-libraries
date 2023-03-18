import { useCallback, useRef, useState } from "react";
import { EventSubject, useHandleEvent } from "./useHandleEvent";

type ScrollDiriection = {
  direction: "up" | "left" | "right" | "down";
  value: number;
};

export function useScrollDiriection(subject: EventSubject) {
  const calculate = useCalculateScrollDiriection();
  const [state, setState] = useState<ScrollDiriection>();

  useHandleEvent(subject, "scroll", () => {
    const target = subject === "window" ? document.documentElement : subject;
    if (!target) {
      return;
    }
    setState(calculate(target));
  });

  return state;
}

export function useCalculateScrollDiriection() {
  const direction = useRef<ScrollDiriection["direction"]>();
  const startPositionRef = useRef({ x: 0, y: 0 });
  const prevPositionRef = useRef({ x: 0, y: 0 });

  const calculate = useCallback((el: HTMLElement) => {
    const y = el.scrollTop;
    const x = el.scrollLeft;

    const prevPosition = prevPositionRef.current;
    const prevDirection = direction.current;

    const currentDirection =
      prevPosition.x < x
        ? "right"
        : prevPosition.x > x
        ? "left"
        : prevPosition.y < y
        ? "down"
        : "up";

    if (prevDirection !== currentDirection) {
      direction.current = currentDirection;
      startPositionRef.current = prevPosition;
    }

    prevPositionRef.current = { x, y };
    const startPosition = startPositionRef.current;

    const result: ScrollDiriection = {
      direction: currentDirection,
      value: Math.abs(
        ["left", "right"].includes(currentDirection)
          ? x - startPosition.x
          : y - startPosition.y
      ),
    };
    return result;
  }, []);
  return calculate;
}
