import { useEffect } from "react";
import { useCallbackRef } from "@boxfox/core-hooks";

export function useBackNavigationEvent(onBack: () => void) {
  const preservedOnBack = useCallbackRef(onBack);

  useEffect(() => {
    function handlePopState(event: PopStateEvent) {
      if (event.state?.isOriginal) {
        preservedOnBack();
      }
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [preservedOnBack]);

  useEffect(() => {
    pushState();
    return () => {
      clearBackNavigationEvent();
    };
  }, []);
}

function pushState() {
  if (history.state?.isOverridden) {
    return;
  }
  const originalState = { ...history.state };

  history.replaceState({ ...originalState, isOriginal: true }, "");
  history.pushState({ ...originalState, isOverridden: true }, "");
}

export function clearBackNavigationEvent() {
  if (history.state?.isOverridden) {
    history.back();
  }
}

export function waitBackNavigationEvent() {
  pushState();

  return new Promise<void>((resolve, reject) => {
    function handlePopState(event: PopStateEvent) {
      window.removeEventListener("popstate", handlePopState);
      if (event.state?.isOriginal) {
        resolve();
      } else {
        reject();
      }
    }
    window.addEventListener("popstate", handlePopState);
  });
}
