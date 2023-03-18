import { useCallback, useMemo, useState } from "react";

export function useTab<T extends string>(defaultTab?: T) {
  const [tab, setTab] = useState<T | undefined>(defaultTab);
  const toggle = useCallback(
    (nextTab: T) =>
      setTab((currentTab) => (currentTab !== nextTab ? nextTab : undefined)),
    []
  );
  const clear = useCallback(() => setTab(undefined), []);
  return useMemo(() => ({ value: tab, set: setTab, toggle, clear }), [
    tab,
    setTab,
    toggle,
    clear,
  ]);
}
