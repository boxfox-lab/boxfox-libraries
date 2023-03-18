import { useCallbackRef } from "@boxfox/core-hooks";
import { isIOS, isServer } from "@boxfox/next";
import { useEffect } from "react";

export type EventSubject = HTMLElement | null | undefined | "window";

export function useWindowResizeEvent(
  handler: EventListener,
  options?: EventListenerOptions
) {
  useWindowEvent("resize", handler, options);
}

export function useWindowScrollEvent(
  handler: EventListener,
  options?: EventListenerOptions
) {
  useWindowEvent("scroll", handler, options);
}

export function useWindowEvent(
  eventName: string,
  handler: EventListener,
  options?: EventListenerOptions
) {
  useHandleEvent("window", eventName, handler, options);
}

export function useHandleEvent(
  subject: EventSubject,
  eventName: string,
  handler: EventListener,
  options?: EventListenerOptions
) {
  const preservedHandler = useCallbackRef(handler);
  const target = getTarget(subject);

  useEffect(() => {
    if (!target) {
      return;
    }
    target.addEventListener(eventName, preservedHandler, options);
    return () => {
      target.removeEventListener(eventName, preservedHandler, options);
    };
  }, [target, eventName, preservedHandler]);
}

function getTarget(subject: EventSubject) {
  if (subject !== "window") {
    return subject;
  }
  if (isServer()) {
    return null;
  }
  return isIOS() ? window.visualViewport : window;
}
