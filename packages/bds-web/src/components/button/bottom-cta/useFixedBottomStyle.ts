import { isIOS, isMobile } from "@boxfox/react-web";
import { CSSProperties, useMemo } from "react";
import { useViewport } from "./useViewport";

export default function useFixedBottomStyle(
  hideWhenKeyboardOpen: boolean = false
): CSSProperties {
  const viewport = useViewport();

  const keyboardHeightRatio = useMemo(() => {
    if (!isMobile()) {
      return 0;
    }

    if (isIOS()) {
      const totalHeight = window.outerHeight ?? window.screen.availHeight;
      const visualHeight = viewport.height ?? window.innerHeight;

      const keyboardHeight = totalHeight - visualHeight;
      return keyboardHeight / totalHeight;
    } else {
      const totalHeight = screen.availHeight;
      const keyboardHeight = totalHeight - window.innerHeight;

      return keyboardHeight / totalHeight;
    }
  }, [viewport.height]);

  const isKeyboardOpen = useMemo(() => {
    if (!isMobile()) {
      return false;
    }
    if (keyboardHeightRatio > 0.3) {
      return true;
    } else {
      return false;
    }
  }, [keyboardHeightRatio]);

  return useMemo(() => {
    if (hideWhenKeyboardOpen && isKeyboardOpen) {
      return { display: "none" };
    }
    if (!isIOS || !isKeyboardOpen) {
      return {};
    }
    return {
      bottom: `${-viewport.offsetY}px`,
    } as const;
  }, [isKeyboardOpen, hideWhenKeyboardOpen, viewport.offsetY]);
}
