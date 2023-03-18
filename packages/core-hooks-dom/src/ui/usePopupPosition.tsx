import { useCallback, useEffect, useRef, useState } from "react";
import { useCombinedRefs } from "@boxfox/core-hooks";

export function usePopupPosition<T extends HTMLElement = HTMLElement>(
  position: Position,
  parent: HTMLElement
) {
  const elementRef = useRef<T>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const calculatePosition = useCallback(() => {
    if (elementRef.current == null) {
      return;
    }
    const { x, y } = calculatePopupPosition(
      position,
      parent,
      elementRef.current
    );
    setX(x);
    setY(y);
  }, [parent, position]);

  useEffect(() => {
    calculatePosition();
  }, [parent, position]);

  const ref = useCombinedRefs(elementRef, calculatePosition);
  return { ref, elementRef, x, y };
}

export function calculatePopupPosition(
  position: Position,
  parent: HTMLElement,
  container: HTMLElement
) {
  const rect = parent.getBoundingClientRect();
  const contextMenuRect = container.getBoundingClientRect();
  const x = calculateX(position, rect, contextMenuRect);
  const y = calculateY(position, rect, contextMenuRect);
  return { x, y };
}

export type Position =
  | "bottomright"
  | "bottomcenter"
  | "bottomleft"
  | "topright"
  | "topcenter"
  | "topleft"
  | "autocenter"
  | "autoright"
  | "autoleft";

function calculateY(
  position: Position,
  parentRect: DOMRect,
  contextMenuRect: DOMRect
) {
  const top = parentRect.y - contextMenuRect.height;
  const bottom = parentRect.y + parentRect.height;
  if (position.startsWith("auto")) {
    const isCloseToTop =
      window.innerHeight - bottom - contextMenuRect.height > top;
    return isCloseToTop ? bottom : top;
  } else if (position.startsWith("top")) {
    return top;
  }
  return bottom;
}

function calculateX(
  position: Position,
  parentRect: DOMRect,
  contextMenuRect: DOMRect
) {
  if (position.endsWith("left")) {
    const left = parentRect.x - contextMenuRect.width / 1.2;
    return left > 0 ? left : 24;
  } else if (position.endsWith("center")) {
    const center =
      parentRect.x + (parentRect.width / 2 - contextMenuRect.width / 2);
    return center > 0 ? center : 24;
  }
  return parentRect.x + parentRect.width / 2;
}
