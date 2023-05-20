import { useContextSafly } from "@boxfox/core-hooks";
import React, {
  createContext,
  MutableRefObject,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Tooltip } from "../components";

const Context = createContext<MutableRefObject<TooltipPair[]> | null>(null);

type TooltipPair = [RefObject<HTMLElement>, ReactNode];

export function TooltipProvider({ children }: { children: ReactNode }) {
  const mapRef = useRef<TooltipPair[]>([]);
  const { position, content, tooltipRef } = useTooltipPosition(mapRef);

  return (
    <Context.Provider value={mapRef}>
      {children}
      {content && (
        <Tooltip ref={tooltipRef} position={position}>
          {content}
        </Tooltip>
      )}
    </Context.Provider>
  );
}

export function useTooltip<E extends HTMLElement = HTMLElement>(
  message?: ReactNode
) {
  const ref = useRef<E>(null);
  const controls = useContextSafly(Context);

  useEffect(() => {
    if (!message) {
      return;
    }
    controls.current = [
      ...controls.current?.filter(([el]) => el !== ref),
      [ref, message],
    ];
    return () => {
      controls.current = controls.current?.filter(([el]) => el !== ref);
    };
  }, [message]);

  return ref;
}

export function useTooltipPosition(targets: RefObject<TooltipPair[]>) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<ReactNode>();
  const [position, setPosition] = useState({ x: "0", y: "0" });
  const hide = useCallback(() => setContent(undefined), []);
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const node = e.target as Node;
    const target = targets.current?.find(
      ([el]) => node == el.current || el.current?.contains(node)
    );
    if (!target) {
      setContent(undefined);
      return;
    }
    setContent(target[1]);
    const targetRect = target[0].current?.getBoundingClientRect();
    const tooltipRect = tooltipRef.current?.getBoundingClientRect();
    if (tooltipRect == null || targetRect == null) {
      return;
    }
    const bottomY = targetRect.y + targetRect.height + 10;
    const topY = targetRect.y - 10 - tooltipRect.height;
    const y =
      window.innerHeight > bottomY + tooltipRect.height ? bottomY : topY;

    setPosition({
      x: `24px`,
      y: `${y}px`,
    });
  }, []);

  useEffect(() => {
    document.addEventListener("touchstart", hide);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("touchstart", hide);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return { position, content, tooltipRef } as const;
}
