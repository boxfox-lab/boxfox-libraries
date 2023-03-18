import { useCallback, useState } from "react";

export function useBooleanState(defaultState: boolean = false) {
  const [state, setState] = useState(defaultState);
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);
  const toggle = useCallback(() => setState((val) => !val), []);
  return [state, setTrue, setFalse, toggle, setState] as const;
}
