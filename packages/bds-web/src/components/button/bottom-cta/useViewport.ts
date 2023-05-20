import { isClient, isIOS, isMobile } from "@boxfox/react-web";
import { useEffect, useMemo, useState } from "react";

export function useViewport() {
  const [height, setHeight] = useState(getViewportHeight());
  const [offsetY, setOffsetY] = useState(0);

  const layoutViewportEl = useMemo(() => {
    if (!isMobile()) {
      return;
    }

    const element = document.createElement("div");
    element.style.position = "fixed";
    element.style.top = "0";
    element.style.bottom = "0";
    element.style.left = "0";
    element.style.right = "0";
    element.style.visibility = "hidden";
    return element;
  }, []);

  useEffect(() => {
    if (layoutViewportEl == null) {
      return;
    }
    document.body.appendChild(layoutViewportEl);
    return () => {
      document.body.removeChild(layoutViewportEl);
    };
  }, [layoutViewportEl]);

  useEffect(() => {
    const { visualViewport } = window;

    if (visualViewport == null || layoutViewportEl == null) {
      return;
    }

    const handler = () => {
      const viewportHeight = getViewportHeight();
      const layoutViewportHeight =
        layoutViewportEl.getBoundingClientRect().height;

      const offsetY =
        visualViewport.height - layoutViewportHeight + visualViewport.offsetTop;

      setOffsetY(offsetY);
      setHeight(viewportHeight);
    };

    const target = isIOS() ? window.visualViewport : window;
    handler();
    target?.addEventListener("resize", handler);
    target?.addEventListener("scroll", handler);
    return () => {
      target?.removeEventListener("resize", handler);
      target?.removeEventListener("scroll", handler);
    };
  }, [layoutViewportEl]);

  return { offsetY, height };
}

function getViewportHeight() {
  if (!isClient()) {
    return 0;
  }

  return (
    window.visualViewport?.height ||
    window.outerHeight ||
    window.screen.availHeight
  );
}
