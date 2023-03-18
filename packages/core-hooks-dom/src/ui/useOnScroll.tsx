import { useEffect, useState } from "react";

type Target = Pick<HTMLElement, "addEventListener" | "removeEventListener">;

export function useOnScroll(onScroll: (e: Event) => void) {
  const [target, setTarget] = useState<Target | null | undefined>(
    typeof window !== "undefined" ? window : undefined
  );
  useEffect(() => {
    target?.addEventListener("scroll", onScroll);
    return () => {
      target?.removeEventListener("scroll", onScroll);
    };
  }, [target]);
  return setTarget;
}
