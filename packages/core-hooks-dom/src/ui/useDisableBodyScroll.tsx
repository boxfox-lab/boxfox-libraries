import { useEffect } from "react";

export function useDisableBodyScroll(disable: boolean) {
  useEffect(() => {
    if (!disable) {
      return;
    }
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [disable]);
}
